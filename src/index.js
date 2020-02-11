/* ДЗ 2 - работа с массивами и объектами */

/*
    Задание 1:

    Напишите аналог встроенного метода forEach для работы с массивами
    Посмотрите как работает forEach и повторите это поведение для массива, который будет передан в параметре array
 */
function forEach(array, fn) {
    for (let i = 0; i < array.length; i++) {
        fn(array[i], i, array)
    }
}

/*
    Задание 2:

    Напишите аналог встроенного метода map для работы с массивами
    Посмотрите как работает map и повторите это поведение для массива, который будет передан в параметре array
 */
function map(array, fn) {
    let newArr = [];

    for (let i = 0; i < array.length; i++) {
        let item = fn(array[i], i, array);

        newArr.push(item);
    }

    return newArr;
}

/*
    Задание 3:

    Напишите аналог встроенного метода reduce для работы с массивами
    Посмотрите как работает reduce и повторите это поведение для массива, который будет передан в параметре array
 */
function reduce(array, fn, initial) {
    let prev = initial ? initial : array[0];
    const firstIter = initial ? 0 : 1;

    for (let i = firstIter; i < array.length; i++) {
        prev = fn(prev, array[i], i, array);
    }

    return prev;
}

/*
    Задание 4:

    Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистр и вернуть в виде массива

    Пример:
    upperProps({ name: 'Сергей', lastName: 'Петров' }) вернет ['NAME', 'LASTNAME']
 */
function upperProps(obj) {
    let arr = [];

    for (let key in obj) {
        arr.push(key.toUpperCase());
    }

    return arr;
}

/*
    Задание 5 *:

    Напишите аналог встроенного метода slice для работы с массивами
    Посмотрите как работает slice и повторите это поведение для массива, который будет передан в параметре array
 */
function slice(array, from, to) {
    const newArr = [];
    let begin = from;
    let end = to;

    if (from === undefined || -from > array.length) {
        begin = 0;
    } else if (from < 0) {
        begin = array.length + from;
    }

    if (to === undefined || to > array.length) {
        end = array.length;
    } else if (to < 0) {
        end = array.length + to;
    }

    for (let i = begin; i < end; i++) {
        newArr.push(array[i]);
    }

    return newArr;
}

/*
    Задание 6 *:

    Функция принимает объект и должна вернуть Proxy для этого объекта
    Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат
 */
function createProxy(obj) {
    return new Proxy(obj, {
        set(target, name, val) {
            return target[name] = val ** 2;
        }
    })
}

export {
    forEach,
    map,
    reduce,
    upperProps,
    slice,
    createProxy
};
