export const params = {
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': '12345'
    }
}

export const normalize = (collection) => {
    let normalizedData = {};
    collection.forEach(item => {
        normalizedData[item.id] = item;
    });
    return normalizedData;
}

export const mapToIds = (collection) => {
    return collection.map(item => item.id);
}
