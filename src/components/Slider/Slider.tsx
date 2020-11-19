import React from 'react';
import style from './Slider.module.css'
 // node_modules/react-leaf-carousel/src/components/InfiniteCarousel.css'

// @ts-ignore
import InfiniteCarousel from 'react-leaf-carousel';

import { NavLink } from 'react-router-dom';

type SliderPropsType = {
    imgArray: Array<string>
}

const Slider = (props: SliderPropsType) => {
    return (
        <div className={style.container}>
            <InfiniteCarousel
                breakpoints={[
                    {
                        breakpoint: 500,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 2,
                        },
                    },
                    {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 3,
                        },
                    },
                ]}
                dots={true}
                showSides={true}
                sidesOpacity={0.5}
                sideSize={0.5}
                slidesToScroll={1}
                slidesToShow={1}
                scrollOnDevice={true}

            >
                <div className={style.item}>
                    <span className={style.title}>Upcoming</span>
                    <img
                        alt=""
                        src={props.imgArray[0]}
                    />
                    <div className={style.button}>
                        <NavLink to={'/upcoming'} ><button>TO THE LIST</button></NavLink>
                    </div>
                </div>
                <div className={style.item}>
                    <span className={style.title}>Rated</span>
                    <img
                        alt=""
                        src={props.imgArray[1]}
                    />
                    <div className={style.button}>
                       <NavLink to={'/rated'} ><button>TO THE LIST</button></NavLink>
                    </div>
                </div>
                <div className={style.item}>
                    <span className={style.title}>Popular</span>
                    <img
                        alt=""
                        src={props.imgArray[2]}
                    />
                    <div className={style.button}>
                        <NavLink to={'/popular'} ><button>TO THE LIST</button></NavLink>
                    </div>
                </div>


            </InfiniteCarousel>
        </div>
    );
};

export default Slider;