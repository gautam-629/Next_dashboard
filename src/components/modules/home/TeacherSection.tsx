import { Button } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import FlipCard from '../../../pages/home/tutorsinformationflipcard/FlipCard';

// import SecondFlipCard from '../../../pages/home/tutorsinformationflipcard/SecondFlipCard';
import { APIGetAllProfessionalTutors } from '../../../api/tutors';
import { Carousel } from '@mantine/carousel';
import { list } from 'postcss';
import { object } from 'yup';
import { ItutorsInterface } from '../../../utils/interfaces/tutors.model';

const TeacherSection = () => {
  const tutorsContent: any = [];

  const [active, setActive] = useState(false);
  const [tutorList, setTutorList] = useState([]);
  const [tutorContentData, setTutorContentData] = useState([]);
  const [spliceData, setSpliceData] = useState([]);
  useEffect(() => {
    getFamousTutors();
  }, []);

  const getFamousTutors = async () => {
    try {
      const tutorsdata: { data: ItutorsInterface[] } = await APIGetAllProfessionalTutors();
      const tutorsList: ItutorsInterface[] = tutorsdata.data;
      for (let i = 1; i <= Math.ceil(tutorsList.length / 4); i++) {
        let tutorsFirstPart: ItutorsInterface[] = [];
        let tutorsSecondPart: ItutorsInterface[] = [];
        const firstIndex = (i - 1) * 4;
        const secondIndex = i * 4 - 1;
        // setSpliceData(tutorList.slice(firstIndex, secondIndex + 1));
        const listOfFourTutors = tutorsList.slice(firstIndex, secondIndex + 1);
        if (listOfFourTutors.length > 2) {
          tutorsFirstPart = listOfFourTutors.slice(0, 2);
          tutorsSecondPart = listOfFourTutors.slice(2, 4);
        } else {
          tutorsFirstPart = listOfFourTutors;
        }
        if (tutorsFirstPart.length > 0) {
          tutorsContent.push(
            <Carousel.Slide key="{'a'+i}" className="flex tutor-slider h-full gap-sm">
              <div className="flex flex-col gap-sm left-side h-full w-1/2 tutor-slide">
                {tutorsFirstPart.length > 0 &&
                  tutorsFirstPart.map((eachTutors: ItutorsInterface, index: number) => (
                    <FlipCard
                      data={eachTutors}
                      key={eachTutors.id ? eachTutors.id : '' + index + Math.random() + '1'}
                    ></FlipCard>
                  ))}
              </div>
              {tutorsSecondPart.length > 0 && (
                <div className="flex flex-col gap-sm right-side h-full w-1/2 tutor-slide2">
                  {tutorsSecondPart.map((eachSecondTutor: ItutorsInterface, index: number) => (
                    <FlipCard
                      data={eachSecondTutor}
                      key={eachSecondTutor.id ? eachSecondTutor.id : '' + index}
                    ></FlipCard>
                  ))}
                </div>
              )}
            </Carousel.Slide>,
          );
        }
      }
      setTutorContentData(tutorsContent);
    } catch (error) {
      console.log(error, 'hello error');
    }
  };

  // let a = ['a', 'v', 'c', 'd', 'e', 'd', 'f', 's', 'g', 's', 'f', 's', 'd'];
  // let b = a;
  // for (let i = 1; i <= Math.ceil(a.length / 4); i++) {
  //   let firstIndex = (i - 1) * 4;
  //   let secondIndex = i * 4 - 1;
  //   console.log(firstIndex + '-' + secondIndex);

  //   console.log(a.slice(firstIndex, secondIndex + 1));
  // }

  return (
    <div className="bg-Grayscale-200">
      <div className="wrapper-x flex flex-col lg:flex-row items-center gap-lg w-full py-sm lg:py-6xl">
        <div className="w-full lg:w-6/12   ">
          <p className="text-3xl md:text-6xl font-normal text-secondary-dark tracking-wider">
            Meet Our{' '}
          </p>
          <p className=" text-3xl md:text-6xl font-normal tracking-wider">Professional Tutors</p>
          <div className=" my-sm md:my-xl">
            {' '}
            <p className=" text-lg md:text-2xl font-normal text-secondary-dark tracking-wider leading-9 ">
              Professional Tutors That Makes You Easy To Learn.We Provide The Best Tutor Of The
              Related Industry.
              <p className=" text-lg md:text-2xl font-normal"> </p>
              <p className=" text-lg md:text-2xl font-normal"></p>
            </p>
          </div>

          {/* <Button size="lg">Explore Our Teachers</Button> */}
        </div>
        <div className=" w-full lg:w-6/12 flex gap-sm">
          <Carousel
            withIndicators
            // height={500}
            height="100%"
            slideSize="100%"
            slideGap="md"
            loop
            align="start"
            slidesToScroll={3}
            className="w-full tutors-carousel"
          >
            {tutorContentData.map((content, index) => (
              <React.Fragment key={index}>{content}</React.Fragment>
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default TeacherSection;
