const grid = document.querySelector('.grid');
let isShiftPressed = false;

createGrid(30, 20);

document.addEventListener('keydown', (e) => {
  if (e.key === 'Shift') isShiftPressed = true;
});

document.addEventListener('keyup', (e) => {
  if (e.key === 'Shift') isShiftPressed = false;
});

grid.addEventListener('click', (e) => {
  if (e.target.classList.contains('cell')) {
    let xy = readCell(e.target);
    if (!isShiftPressed) {
      clearGrid();
    }
    colorGrid(xy[0], xy[1]);
  }
});

function createGrid(rows, cols) {
  grid.style.display = 'flex';
  grid.style.flexWrap = 'wrap';
  grid.style.width = `${cols * 42 + (cols - 1) * 2 - 30}px`;

  for (let i = 1; i < rows + 1; i++) {
    const row = document.createElement('div');
    row.style.display = 'flex';
    for (let j = 1; j < cols + 1; j++) {
      const cell = document.createElement('div');
      cell.content = `${i}/${j}`;
      Object.assign(cell.style, {
        width: '40px',
        height: '40px',
        color: '#fff',
        backgroundColor: '#fff',
        border: '1px solid #000',
      });
      cell.classList.add('cell');
      row.appendChild(cell);
    }
    grid.appendChild(row);
  }
}

function colorGrid(x, y) {
  Array.from(grid.children[x - 1].children).forEach((cell, j) => {
    cell.style.backgroundColor = 'lightblue';
    cell.innerText = `${x}/${j + 1}`;
  });
  let cell;
  for (let i = 0; i < grid.children.length; i++) {
    cell = grid.children[i].children[y - 1];
    cell.style.backgroundColor = 'lightblue';
    cell.innerText = `${i + 1}/${y}`;
  }
  cell = grid.children[x - 1].children[y - 1];
  cell.style.backgroundColor = 'blue';
}

function clearGrid() {
  Array.from(grid.children).forEach((row) => {
    Array.from(row.children).forEach((cell) => {
      cell.style.backgroundColor = '#fff';
      cell.innerText = ``;
    });
  });
}

function readCell(target) {
  return target.content.split('/').map((el) => parseInt(el));
}
