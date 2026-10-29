type Time = 'days' | 'minutes';

export function parsecookie(score: number, time: Time ) {
    switch(time) {
        case 'days':
            return score * 24 * 60 * 60 * 1000; //n - дней
        case 'minutes':
            return score * 60 * 1000; //n - минут
        
    }
}