import { SmallBoxContainer } from '../../../basic-elements/box-card/small-box';
import { memo, Fragment } from 'react';
import styled from 'styled-components';
import Slider from "react-slick";
import { map } from 'lodash';
import { ImageLogo, TextLabel } from '../../../navbar/navbar';
import { BoxSpecialist } from './box-specialist';
import LeftArrow from '../../../../assets/image/icons/left-arrow.svg';
import RightArrow from '../../../../assets/image/icons/right-arrow.svg';
import { IDoctorSpecialist } from '../../../../data/services/alteaCMS/IAlteaCMS';

export interface IBoxSpecialist {
	key: number;
	iconHeight: number;
	iconWidth: number;
	iconSrc: string;
	specialistName: string;
}

export interface IImageData {
	id: number;
	name: string;
	imagePath: string;
}

const ContainerSkeletonBox = styled.div`
	display: flex;
	flex-direction: column;
`;

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
	onRedirect(): void
	iconHeight: number;
	iconWidth: number;
	dataSpecialist: IDoctorSpecialist[];
	loading: boolean;
	isForMobileLayout: boolean;
	activeHover: boolean;
}

function _CarouselSpecialist(props: ICarousel) {
	const { onRedirect, activeHover, isForMobileLayout, iconHeight, iconWidth, dataSpecialist, loading } = props;

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
		slidesToShow: 4,
		slidesToScroll: 1,
		centerPadding: "0px",
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 4,
					slidesToScroll: 1,
					infinite: true,
					centerMode: true,
					centerPadding: "0px",
				}
			},
			{
				breakpoint: 800,
				settings: {
					slidesToShow: 4,
					slidesToScroll: 1,
					infinite: true,
					centerMode: true,
					centerPadding: "0px",
				}
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 4,
					slidesToScroll: 1,
					infinite: true,
					centerMode: true,
					centerPadding: "0px",
				}
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 4,
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
			name: "",
			icon: {
				url: ""
			}
		},
		{
			name: "",
			icon: {
				url: ""
			}
		},
		{
			name: "",
			icon: {
				url: ""
			}
		},
		{
			name: "",
			icon: {
				url: ""
			}
		}
	];

	const newData = dataSpecialist.length > 0 && !loading ? dataSpecialist : dummyData;

	return (
		<Fragment>
			<Slider {...settings}>
				{map(newData, (item: IDoctorSpecialist, idx: number) => (
					<BoxSpecialist
						id="data"
						key={idx}
						activeHover={activeHover}
						iconHeight={iconHeight}
						iconWidth={iconWidth}
						iconSrc={item.icon?.url}
						specialistName={item?.name}
						specialization_id={item?.specialization_id}
						onRedirect={onRedirect}
						loading={loading}
						isForMobileLayout={isForMobileLayout}
						mobileconPadding={"2px 2px"}
						mobileconMargin={'0px 2px'}
						{...props}
					/>
				))

				}

			</Slider>
		</Fragment>
	)
}

export const CarouselSpecialist = memo(_CarouselSpecialist);

