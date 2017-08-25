const baseUrl = 'http://localhost:5001';

export function fetchCategories() {
    return fetch(`${baseUrl}/categories`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': '12345'
        }
    })
        .then(res => res.json())
        .then(res => res.categories);
}
