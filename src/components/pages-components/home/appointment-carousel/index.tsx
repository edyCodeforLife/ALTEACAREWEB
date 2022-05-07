
import { memo, Fragment } from 'react';
import styled from 'styled-components';
import Slider from "react-slick";
import { map } from 'lodash';
import { ImageLogo } from '../../../navbar/navbar';
import { BoxAppointment } from './appointment-box';
import LeftArrow from '../../../../assets/image/icons/left-arrow.svg';
import RightArrow from '../../../../assets/image/icons/right-arrow.svg';
import { IDataAppointment } from '../../../../data/services/appointment/IAppointment';


const ContainerArrow = styled.button`
	background: transparent;
`;

function SampleNextArrow(props) {
	const { className, style, onClick } = props;
	return (
		<ContainerArrow onClick={onClick} className={className}
			style={{ ...style }}>
			<ImageLogo src={RightArrow} height={30} width={30} />
		</ContainerArrow>
	)
}

function SamplePrevArrow(props) {
	const { className, style, onClick } = props;
	return (
		<ContainerArrow onClick={onClick} className={className}
			style={{ ...style }}>
			<ImageLogo src={LeftArrow} height={30} width={30} />
		</ContainerArrow>
	)
}

interface ICarousel {
	loading: boolean;
	listAppointment: any[];
	handleClickBox(id: number, status: string, transaction: any): void;
}

function _CarouselAppointmentCard(props: ICarousel) {
	const { loading, listAppointment, handleClickBox } = props;

	const settings = {
		dots: false,
		infinite: true,
		autoplay: false,
		centerMode: false,
		pauseOnHover: true,
		pauseOnFocus: true,
		swipeToSlide: true,
		nextArrow: <SampleNextArrow />,
		prevArrow: <SamplePrevArrow />,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		centerPadding: "0px",
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					infinite: true,
					centerMode: true,
					centerPadding: "0px",
				}
			},
			{
				breakpoint: 800,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					infinite: true,
					centerMode: true,
					centerPadding: "0px",
				}
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					infinite: true,
					centerMode: true,
					centerPadding: "0px",
				}
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					infinite: true,
					centerMode: true,
					centerPadding: "0px",
				}
			}
		]
	};

	const dummyData = [
		{
			id: "",
			order_code: "",
			status: "",
			status_detail: {
				label: "",
				text_color: "",
				bg_color: ""
			},
			schedule: {
				id: "",
				code: "",
				date: "",
				time_start: "",
				time_end: ""
			},
			doctor: {
				id: "",
				name: "",
				photo: {
					url: "",
					formats: {
						thumbnail: "",
						large: "",
						medium: "",
						small: ""
					}
				},
				specialist: {
					id: "",
					name: ""
				},
				hospital: {
					id: "",
					name: "",
					logo: ""
				}
			},
			user: {
				id: "",
				name: "",
				first_name: "",
				last_name: ""
			},
			transaction: null,
			created: ""
		}
	];
	const newData = listAppointment?.length > 0 && !loading ? listAppointment : dummyData;

	return (
		<Fragment>
			<Slider {...settings}>
				{map(newData, (item: IDataAppointment, idx: number) => (
					<BoxAppointment
						id="data"
						handleClickBox={handleClickBox}
						item={item}
						loading={loading}
						key={idx}
						isNormalBox
						{...props}
					/>
				))
				}

			</Slider>
		</Fragment>
	)
}

export const CarouselAppointmentCard = memo(_CarouselAppointmentCard);

