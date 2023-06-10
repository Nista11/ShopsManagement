class Validation {
    constructor() {
        throw new TypeError("Construction of object unaccesable");
    }

    static validEmail(email) {
        if (!email || typeof(email) !== 'string')
            return false;
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
    }

    static validPhoneNumber(phoneNumber) {
        if (!phoneNumber || typeof(phoneNumber) !== 'string')
            return false;
        return /^\+?\d+$/.test(phoneNumber);
    }

    static validDateFormat(date) {
        if (!date || typeof(date) !== 'string')
            return false;
        return /^[0-9]{1,2}-[0-9]{1,2}-[0-9]{4}$/.test(date);
    }

    static validPositive(num) {
        if (num === null || (typeof(num) === 'string' && num === ''))
            return false;

        if (Number.isNaN(Number(num)))
            return false;
        if (num <= 0)
            return false;
        return true;
    }

    static validPositiveOrZero(num) {
        if (!num || (typeof(num) === 'string' && num === ''))
            return true;

        if (Number.isNaN(Number(num)))
            return false;
        if (num < 0)
            return false;
        return true;
    }

    static validStringNotBlank(str) {
        if (!str || typeof(str) !== 'string' || str.length <= 0) {
            return false;
        }
        return true;
    }

    static getPasswordStrength(password) {
        if (!password || typeof(password) !== 'string')
            return 'Very weak';

        let points = 0;

        if (password.length >= 12)
            points += 2;
        else if (password.length >= 8)
            points += 1;

        if (/[a-z]/g.test(password) && /[A-Z]/g.test(password))
            points += 1;
        if (/[0-9]/g.test(password))
            points += 1;
        if (/[^a-zA-Z0-9]/.test(password))
            points += 2; 

        if (points === 0)
            return 'Very weak';
        if (points <= 2)
            return 'Weak';
        if (points <= 4)
            return 'Medium';
        if (points <= 5)
            return 'Strong';
        return 'Very strong';
    }

    static validDate(date) {
        if (!Validation.validDateFormat(date))
            return false;

        let year = Number(date.substring(date.length - 4));
        let day, monthStart;
        if (date[1] !== '-') { 
            day = date.substring(0, 2);
            monthStart = 3;
        }
        else {
            day = date[0];
            monthStart = 2;
        }
        day = Number(day);
        let month;
        if (date[monthStart + 1] !== '-') { 
            month = date.substring(monthStart, monthStart + 2);
        }
        else {
            month = date[monthStart];
        }
        month = Number(month);
        
        if (year > 2030 || year < 1900)
            return false;

        if (day < 1 || day > 31 || month < 1 || month > 12)
            return false;
        if ((month === 4 || month === 6 || month === 9 || month === 11) && day > 30)
            return false;
        if (month === 2) {
            if (day > 29)
                return false;
            if (day === 29) {
                if (!(((year % 4 == 0) && // leap year
                (year % 100 != 0)) ||
                (year % 400 == 0))) 
                    return false;
            }
        }

        return true;
    }
}

export default Validation;