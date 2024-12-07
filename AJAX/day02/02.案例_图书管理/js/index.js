
console.log('hp');
function getBookList() {
    axios({
        url: 'http://hmajax.itheima.net/api/books',
        method: 'GET',
        params: {
            creator: 'hp',
        },
    }).then(res => {
        console.log(res.data.data);
        const bookList = res.data.data;
        const htmlStr = bookList.map((item, index) => {
            return `        <tr>
          <td>${index + 1}</td>
          <td>${item.bookname}</td>
          <td>${item.author}</td>
          <td>${item.publisher}</td>
          <td data-id=${item.id}>
            <span class="del">删除</span>
            <span class="edit">编辑</span>
          </td>
        </tr>`;
        }).join('');
        document.querySelector('.list').innerHTML = htmlStr;
    })
}


getBookList();

const addModalDom = document.querySelector('.add-modal');
const addModal = new bootstrap.Modal(addModalDom);

document.querySelector('.add-btn').addEventListener('click', () => {
    const addForm = addModalDom.querySelector('form');
    const bookObj = serialize(addForm, {
        hash: true,
        empty: true,
    });

    axios({
        url: 'http://hmajax.itheima.net/api/books',
        method: 'POST',
        data: {
            ...bookObj,
            creator: 'hp',
        }
    }).then(res => {
        console.log(res);
        getBookList();
        addModal.hide();
        addForm.reset();
    })
    
    console.log(1);
});


document.querySelector('.list').addEventListener('click', (e) => {
    const target = e.target;
    if (e.target.classList.contains('del')) {
        console.log('del');
        const id = e.target.parentNode.dataset.id;
        console.log(id);
        axios({
            url: `http://hmajax.itheima.net/api/books/${id}`,
            method: 'DELETE',
        }).then(res => {
            console.log(1);
            getBookList();
        })
    }
});


const editDom = document.querySelector('.edit-modal');
const editModal = new bootstrap.Modal(editDom);

document.querySelector('.list').addEventListener('click', e => {
    if (e.target.classList.contains('edit')) {
        const id = e.target.parentNode.dataset.id;
        axios({
            url: `http://hmajax.itheima.net/api/books/${id}`
        }).then(res => {
            const bookObj = res.data.data;
            const keys = Object.keys(bookObj);
            console.log(keys);
            keys.forEach(key => {
                document.querySelector(`.edit-form .${key}`).value = bookObj[key];
            })
        });

        editModal.show();
    }
});

document.querySelector('.edit-btn').addEventListener('click', () => {
    const editForm = document.querySelector('.edit-form');
    const {id, bookname, author, publisher} = serialize( editForm, { hash : true, empty: true});
    axios({
        url: `http://hmajax.itheima.net/api/books/${id}`,
        method: 'PUT',
        data: {
            bookname,
            author,
            publisher,
            creator: 'hp',
        }
    }).then(res => {
        getBookList();
        editModal.hide();
    });
})