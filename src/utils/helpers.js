import React from 'react';

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

export const unNormalize = (obj) => Object.values(obj);

export const mapToIds = (collection) => {
    return collection.map(item => item.id);
}

export function generateId() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

export const filterDeleted = collection => collection.filter(item => !item.deleted);

export const validateRequired = value => value ? undefined : 'This field is required';

export const renderInputField = ({ input, label, type, meta: { touched, error } }) => (
    <div>
        <label>{label}</label>
        <div>
            <input {...input} placeholder={label} type={type} />
            <div>{touched && error && <span>{error}</span>}</div>
        </div>
    </div>
);

export const renderTextareaField = ({ input, label, type, meta: { touched, error } }) => (
    <div>
        <label>{label}</label>
        <div>
            <textarea {...input} placeholder={label} type={type} />
            <div>{touched && error && <span>{error}</span>}</div>
        </div>
    </div>
);
