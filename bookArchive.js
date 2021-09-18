// Toggle Spinner 
const toggleSpinner = displayStyle =>{
    document.getElementById('loadingSpinner').style.display = displayStyle;
}

//Toggle Search Result
const toggleSearchResult = displayStyle =>{
    document.getElementById('searched-data').style.display = displayStyle;
}


// Search Input 

const searchInput = () =>{
    const inputField = document.getElementById('inputField');
    const inputFieldText = inputField.value;

    // Display Spinner 
    toggleSpinner('block');
    toggleSearchResult('none');

    findSearchedData(inputFieldText);
    inputField.value = '';
}



//  Search Result from API 

const findSearchedData = async bookName =>{
    const url = `https://openlibrary.org/search.json?q=${bookName}`;
    const res = await fetch(url);
    const data = await res.json();
    // console.log('Data', data.docs);
    loadSearchedData(data.docs, bookName);
}

// Load Searched Result
 const loadSearchedData = (books, bookName) => {

    //  Search Results Number 
    const resultLength = document.getElementById('result-length');
    resultLength.textContent ='';
    const p = document.createElement('p');
    p.classList.add('text-center');
    p.classList.add('fw-bold');
    p.classList.add('fs-2');
    p.innerText = `Number of Results: ${books.length}`;
    resultLength.appendChild(p);


    const searchedData = document.getElementById('searched-data');
    searchedData.textContent = '';

    // Error Handling 
    if(books === null || bookName === '' || books.length === 0){
        const divError = document.getElementById('error-message');
        divError.textContent = '';
        divError.style.display = 'block';
        const p = document.createElement('p');
        p.classList.add('text-center');
        p.classList.add('text-danger');
        p.classList.add('fw-bold');
        p.classList.add('fs-2');
        p.innerText = 'No Results Found';
        divError.appendChild(p);
        toggleSpinner('none');
    }
    else{
        document.getElementById('error-message').style.display = 'none';
        books.forEach(book =>{
            // Display Searched Books 
            const divData = document.createElement('div');
            divData.classList.add('col');
            divData.innerHTML=`
                        <div class="card h-100">
                            <img src='https://covers.openlibrary.org/b/id/${book.cover_i ? book.cover_i :''}-M.jpg' class="card-img-top" alt="...">
                            <div class="card-body">
                              <h5 class="card-title">${book.title ? book.title : 'Not Availabe'}</h5>
                              <h5 class="card-title">Author: ${book.author_name ? book.author_name : 'Not Availabe'}</h5>
                              <h5 class="card-title">Publisher: ${book.publisher ? book.publisher : 'Not Availabe'}</h5>
                              <h5 class="card-title">First Published: ${book.first_publish_year ? book.first_publish_year : 'Not Availabe'}</h5>
                              
                            </div>
                        </div>
            `;
            searchedData.appendChild(divData);
        });
        toggleSpinner('none');
        toggleSearchResult('flex');
    }

    
 }



 