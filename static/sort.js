function sortTable(column) {
  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById("userTable");
  switching = true;
  while (switching) {
    switching = false;
    rows = table.rows;
    for (i = 1; i < rows.length - 1; i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("TD")[column];
      y = rows[i + 1].getElementsByTagName("TD")[column];
      if (table.getAttribute("data-sort-order") === "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      } else {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
  table.setAttribute("data-sort-order", table.getAttribute("data-sort-order") === "asc" ? "desc" : "asc");
  var headers = table.getElementsByTagName("TH");
  for (var j = 0; j < headers.length; j++) {
    headers[j].classList.remove("sorted-asc", "sorted-desc");
  }
  headers[column].classList.add(table.getAttribute("data-sort-order") === "asc" ? "sorted-asc" : "sorted-desc");
}