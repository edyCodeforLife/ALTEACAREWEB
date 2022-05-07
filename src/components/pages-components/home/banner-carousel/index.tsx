
import { memo, Fragment } from 'react';
import styled from 'styled-components';
import Slider from "react-slick";
import { map } from 'lodash';
import { ImageLogo } from '../../../navbar/navbar';
import LeftArrow from '../../../../assets/image/icons/left-arrow.svg';
import RightArrow from '../../../../assets/image/icons/right-arrow.svg';
import { IBannerData } from '../../../../data/services/alteaCMS/IAlteaCMS';
import { FlexRowCenter } from '../../../basic-elements/flex';
import { isMobile } from '../../../../data/global/function';
import { CustomSkeleton } from '../../../basic-elements/skeleton/skeleton';

const ContainerArrow = styled.button`
	background: transparent;
`;

const ContainerBanner = styled(FlexRowCenter)`
	align-items: center;
	display: flex !important;
	justify-content: center;
	outline: none;
	cursor: pointer;
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
	bannerData: IBannerData[];
	handleClickBanner(url: string): void
}

function _CarouselBanner(props: ICarousel) {
	const { loading, bannerData, handleClickBanner } = props;

	const settings = {
		dots: false,
		infinite: true,
		autoplay: true,
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

	const newData = bannerData?.length > 0 && !loading ? bannerData : [];

	return (
		<Fragment>
			<Slider {...settings}>
				{newData.length > 0 && !loading ? (
					map(newData, (item: IBannerData, idx: number) => (
						<ContainerBanner key={idx} onClick={() => handleClickBanner(item?.url_web)}>
							<ImageLogo
								height={140}
								mwidth={isMobile() ? 240 : 300}
								style={{ width: 'auto' }}
								src={item?.image_mobile}
								{...props}
							/>
						</ContainerBanner>

					))
				) : (
					<ContainerBanner>
						<CustomSkeleton
							animation="wave"
							variant="rect"
							mobileheight={140}
							height={140}
							mobilewidth={isMobile() ? 240 : 300}
							width={isMobile() ? 240 : 300}
							isForMobileLayout
						/>
					</ContainerBanner>
				)

				}

			</Slider>
		</Fragment>
	)
}

export const CarouselBanner = memo(_CarouselBanner);

