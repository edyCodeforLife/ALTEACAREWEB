import { isNull, isUndefined, isPlainObject } from 'lodash';
import { format } from 'date-fns';

export const isBlank = (str: string) => {
	return isUndefined(str) || isNull(str) || str === '';
};

export const randomChar = () =>
	(Math.random().toString(36) + '00000000000000000').slice(2, 10);

export const numberFormat = (value: any, lang: string, fraction?: number) => {
	if (isNaN(parseFloat(value))) value = 0.0;
	return String(
		new Intl.NumberFormat(lang === 'en' ? 'en-EN' : 'id-ID', {
			maximumFractionDigits: fraction || 2,
			minimumFractionDigits: fraction || 0,
		}).format(parseFloat(value))
	);
};


export const clamp = (val: number, min: number, max: number) =>
	Math.min(Math.max(min, val), max);

export const moneyFormat = (
	value: any,
	lang: string,
	fraction?: number,
	_currency?: string
) => {
	let currency =
		_currency === 'USD' ? _currency + ' ' : lang === 'en' ? 'IDR ' : 'Rp ';
	return currency + numberFormat(value, lang, fraction);
};

export const QrsToObj = (str: any) => {
	let search = str.substring(1);
	return search
		? JSON.parse('{"' + search.replace(/&/g, '","').replace(/=/g, '":"') + '"}', function (
			key,
			value
		) {
			return key === '' ? value : decodeURIComponent(value);
		})
		: {};
};

export const validateEmail = (email) => {
	const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(String(email).toLowerCase());
}

export const isMobile = () => {
	let check = false;
	(function (a) {
		if (
			/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
				a
			) ||
			/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
				a.substr(0, 4)
			)
		)
			check = true;
	})(window.navigator.userAgent || window.navigator.vendor);
	return check;
};

export const formattedDate = (
	_date: any,
	lang: string,
	withDayName?: boolean,
	withTime?: boolean,
	short?: boolean,
	withoutYear?: boolean
) => {
	const date = new Date(_date);

	const months: any = {
		idn: [
			'Januari',
			'Februari',
			'Maret',
			'April',
			'Mei',
			'Juni',
			'Juli',
			'Agustus',
			'September',
			'Oktober',
			'November',
			'Desember',
		],
		en: [
			'January',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December',
		],
	};

	const monthsShort: any = {
		idn: [
			'Jan',
			'Feb',
			'Mar',
			'Apr',
			'Mei',
			'Jun',
			'Jul',
			'Agu',
			'Sep',
			'Okt',
			'Nov',
			'Des',
		],
		en: [
			'Jan',
			'Feb',
			'Mar',
			'Apr',
			'May',
			'Jun',
			'Jul',
			'Aug',
			'Sep',
			'Oct',
			'Nov',
			'Dec',
		],
	};

	const dayLabel = {
		idn: ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"],
		en: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
	};

	if (!isNaN(date.getTime())) {
		let year: any = date.getFullYear(),
			month = date.getMonth(),
			day = date.getDate(),
			dayName = date.getDay(),
			hour = date.getHours(),
			minute = date.getMinutes();

		if (String(minute).length < 2) (minute as any) = '0' + minute;

		let monthName = months[lang][month];
		let dayText = dayLabel[lang][dayName];
		if (short) monthName = monthsShort[lang][month];
		if (lang === 'idn')
			return `${withDayName ? dayText + "," : ""} ${day < 10 ? '0' + day : day} ${monthName} ${withoutYear ? '' : year
				} ${withTime ? hour + ':' + minute : ''}`;
		else
			return `${withDayName ? dayText : ""} ${monthName} ${day < 10 ? '0' + day : day}${withoutYear ? ' ' : ', ' + year
				} ${withTime ? hour + ':' + minute : ''}`;
	}
	return undefined;
};

export const getInitials = (fullName) => {
	let names = fullName.split(' '),
		initials = names[0].substring(0, 1).toUpperCase();

	if (names.length > 1) {
		initials += names[names.length - 1].substring(0, 1).toUpperCase();
	}
	return initials;
};

export const capitalizeName = (name) => {
	return name.replace(/\b(\w)/g, s => s.toUpperCase());
}


// Recursively removes any object keys with a value of undefined
export const removeUndefineds = <T>(obj: T): T => {
	if (!isPlainObject(obj)) return obj;

	const target: { [name: string]: any } = {};

	for (const key in obj) {
		const val = obj[key];
		if (typeof val !== 'undefined') {
			target[key] = removeUndefineds(val);
		}
	}
	return target as T;
}

export const getDeviceInfo = async () => {
	const devices = await navigator.mediaDevices.enumerateDevices();

	return {
		audioInputDevices: devices.filter(device => device.kind === 'audioinput'),
		videoInputDevices: devices.filter(device => device.kind === 'videoinput'),
		audioOutputDevices: devices.filter(device => device.kind === 'audiooutput'),
		hasAudioInputDevices: devices.some(device => device.kind === 'audioinput'),
		hasVideoInputDevices: devices.some(device => device.kind === 'videoinput'),
	};
}

// This function will return 'true' when the specified permission has been denied by the user.
// If the API doesn't exist, or the query function returns an error, 'false' will be returned.
export const isPermissionDenied = async (name: any) => {
	if (navigator.permissions) {
		try {
			const result = await navigator.permissions.query({ name });
			return result.state === 'denied';
		} catch {
			return false;
		}
	} else {
		return false;
	}
}

export const playSound = (url: string, loop: boolean) => {
	const audio = new Audio(url);
	audio.setAttribute("id", "ringtoneCall");
	audio.src = url;
	audio.loop = loop;
}

export const addDaystoCurrentDate = (day: number) => {
	if (isNaN(day)) return;
	let date = new Date();
	date.setDate(date.getDate() + day);
	return format(date, 'yyyy-MM-dd');;
}
