import math
import time
from functools import wraps
from flask import Flask, request, render_template, jsonify, redirect, url_for, flash, get_flashed_messages, session
from flask_bcrypt import Bcrypt
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///users.db"
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
login_manager = LoginManager(app)
login_manager.login_view = 'login'  # specify what page to load for NON-AUTHED users
app.config['SECRET_KEY'] = 'you-will-never-guess'  # TODO: Please replace it with a secure key


def login_required(view_func):
    @wraps(view_func)
    def wrapped_view(*args, **kwargs):
        if not current_user.is_authenticated:
            flash('Неавторизованному пользователю доступ запрещен.', 'danger')
            return redirect(url_for('login'))
        return view_func(*args, **kwargs)
    return wrapped_view


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))


roles = ['student', 'admin', 'professor']


class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(100))
    role = db.Column(db.String(20))
    email = db.Column(db.String(100), unique=True)
    password = db.Column(db.String(100))
    group_code = db.Column(db.String(20))
    timestamp = db.Column(db.Float())
    status = db.Column(db.String(20))


with app.app_context():
    db.create_all()


@app.route("/logout")
def logout():
    logout_user()
    session.clear()
    return redirect(url_for('login'))


@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        user = User.query.filter_by(email=request.form['email']).first()
        if user and bcrypt.check_password_hash(user.password, request.form['password']):
            login_user(user)
            return redirect(url_for('mainpage'))
        elif user_exists(request.form['email']) == 0:
            flash("Пользователь с такой электронной почтой не существует", "danger")
        else:
            flash("Неправильный пароль", "danger")
        print(user_exists(request.form['email']))
    return render_template('login.html')


def update_timestamp(user):
    user.timestamp = time.time()

    db.session.commit()


@app.route('/')
@login_required
def mainpage():
    user = User.query.get(current_user.id)
    update_timestamp(user)
    student_status(user)
    return render_template("index.html", user=user)


def user_exists(email):
    user = User.query.filter_by(email=email).first()
    return user is not None


@app.route("/register", methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        hashed_password = bcrypt.generate_password_hash(request.form['password']).decode('utf-8')
        if user_exists(request.form['email']):
            flash("Пользователь с такой электронной почтой уже зарегестрирован", "danger")
            return render_template('register.html')
        if request.form['password'] == request.form['confirm-password']:
            new_user = User(full_name=request.form['full_name'],
                            role='student',  # all users are students initially
                            email=request.form['email'],
                            password=hashed_password,
                            group_code=request.form['group_code'],
                            timestamp=time.time(),
                            status='offline')
            db.session.add(new_user)
            db.session.commit()
            flash("Пользователь зарегестрирован", "success")
            return redirect(url_for('login'))
        else:
            flash("Введённые пароли отличаются", "danger")
    return render_template('register.html')


@app.route('/profile', methods=['GET', 'POST'])
@login_required
def profile():  # put application's code here
    user = User.query.get(current_user.id)
    update_timestamp(user)
    return render_template("profile.html", user=user)


@app.route('/update_profile', methods=['POST'])
def update_profile():
    user = User.query.get(current_user.id)
    update_timestamp(user)
    if user.email != request.form['email']:
        if user_exists(request.form['email']) != 1:
            user.email = request.form['email']
        else:
            flash("Данная почта уже используется другим человеком", "danger")
            return render_template("profile.html", user=user)
    if user.full_name != request.form['full_name']:
        user.full_name = request.form['full_name']
    if user.group_code != request.form['group_code']:
        user.group_code = request.form['group_code']
    if len(request.form['password']) > 0:
        if request.form['password'] == request.form['confirm_password']:
            hashed_password = bcrypt.generate_password_hash(request.form['password']).decode('utf-8')
            user.password = hashed_password
        else:
            flash("Введён неправильный пароль", "danger")
            return redirect(url_for('profile'))
    db.session.commit()
    flash("Данные изменены", "success")
    return render_template("profile.html", user=user)


@app.route('/students', methods=['GET'])
@login_required
def students():
    user = User.query.get(current_user.id)
    if user.role == "admin" or user.role == "professor":
        students = User.query.filter(User.role == "student")
        for student in students:
            student_status(student)
        return render_template("students.html", students=students, user=user)
    else:
        return redirect(url_for('mainpage'))


@app.route('/make_professor', methods=['POST'])
def make_professor():
    user = User.query.filter(User.email == request.form['email']).first()
    if user == None:
        flash("Пользователь с такой почтой не зарегестрирован", "warning")
    else:
        user.role = 'professor'
        db.session.commit()
        flash("Данные изменены", "success")
    return redirect(url_for('students'))


def student_status(student):
    current_timestamp = time.time()  # Current timestamp
    time_difference = current_timestamp - student.timestamp
    if time_difference > 300:
        student.status = "Offline"
    else:
        student.status = "Online"


@app.route('/calculation', methods=['POST'])
def calculation():
    user = User.query.get(current_user.id)
    liquid = request.form.get('liquid')
    metal = request.form.get('metal')
    defLiquidSpeed = float(request.form.get('defLiquidSpeed'))
    heightWaterTower = float(request.form.get('heightWaterTower'))
    heightPipe = float(request.form.get('heightPipe'))
    widthWall = float(request.form.get('widthWall'))
    if liquid == 'water':
        density = 1000
        elastic_modulus_of_liquid = 20300
    elif liquid == 'oil':
        density = 1000
        elastic_modulus_of_liquid = 20300
    pressure = heightWaterTower * density * 9.806
    if metal == 'copper':
        elastic_modulus_of_metal = 1020000
    elif metal == 'aluminium':
        elastic_modulus_of_metal = 713800
    elif metal == 'steel':
        elastic_modulus_of_metal = 2039400
    Part = density*defLiquidSpeed*(1/(math.sqrt(density*((heightPipe/(elastic_modulus_of_metal*widthWall))+(1/elastic_modulus_of_liquid)))))
    absolute = pressure*((heightPipe**2)/(4*elastic_modulus_of_metal*widthWall))
    return render_template('index.html', user=user, Part=Part, absolute=absolute)


if __name__ == '__main__':
    app.run(debug=True)