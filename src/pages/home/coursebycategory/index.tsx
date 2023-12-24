import { Box, Card, Grid, Tabs, Text } from '@mantine/core';
import { useEffect, useState } from 'react';
import CategoryDescription from './CategoryDescription';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {
  getCoursesByCategory,
  getFeaturedCategory,
} from '../../../store/modules/categories/actions';
import { Avatar, DefaultImage } from '../../../utils/assets/image';
import { errorImageHandler } from '../../../utils/assets/imageurl';
import { Category } from '../../../utils/interfaces/Category.model';
import { ICourse } from '../../../utils/interfaces/Course.model';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

const CourseByCatergory = () => {
  const dispatch = useDispatch() as any;
  const [activeTab, setActiveTab] = useState<string>('');
  const featuredCategory = useSelector((state: any) => state?.categoryReducer?.featuredCategory);
  const coursesByCategory = useSelector((state: any) => state?.categoryReducer?.coursesByCategory);
  console.log(coursesByCategory, 'featurecategory');
  const navigate = useNavigate();
  const handleTabChange = (categoryId: string) => {
    setActiveTab(categoryId);
    // console.log(categoryId, 'handleTAbchange');
    dispatch(getCoursesByCategory(categoryId));
  };
  const handleTabChangeFirst = (categoryId: string) => {
    // console.log(activeTab, 'handleTabchangefirst');
    if (activeTab) {
      dispatch(getCoursesByCategory(activeTab));
    }
  };

  useEffect(() => {
    dispatch(getFeaturedCategory());
  }, []);

  useEffect(() => {
    handleTabChangeFirst(activeTab);
  }, [activeTab]);

  useEffect(() => {
    if (featuredCategory && featuredCategory?.length && featuredCategory[0]?._id) {
      setActiveTab(featuredCategory[0]?._id);
    }
  }, [featuredCategory]);
  // console.log(activeTab, '@activeTab');

  return (
    <>
      <Tabs value={activeTab} onTabChange={handleTabChange} className="mt-sm py-xs rounded-lg ">
        <div className="flex justify-between overflow-hidden">
          {featuredCategory?.slice(0, 11).map((cat: Category, index: number) => (
            <Tabs.List className="border-none" key={index}>
              <Tabs.Tab
                value={cat?._id}
                className="text-base font-semibold tracking-wider text-secondary-dark"
              >
                {cat?.title}
              </Tabs.Tab>
            </Tabs.List>
          ))}
        </div>
        {featuredCategory?.map((v: Category, index: number) => (
          <Tabs.Panel value={v?._id} className="mt-lg lg:mt-xl" key={index}>
            <div className=" relative p-sm border-solid rounded-lg border border-Grayscale-400 ">
              <Grid gutter="xl">
                <Grid.Col md={7} xs={12}>
                  <CategoryDescription
                    title={v?.title}
                    yearlyIncome={v?.yearlyIncome}
                    growthPercentage={v?.growthPercentage}
                    imageUrl={v?.imageUrl}
                    description={v?.description}
                    jobOpening={v?.jobOpening}
                  />
                </Grid.Col>
                <Grid.Col md={5} xs={12} className="relative">
                  <p className="text-2xl font-semibold text-secondary-default">Course</p>
                  {coursesByCategory?.length === 0 || coursesByCategory === undefined ? (
                    <div className="mt-xl fontSize-xl">
                      Unfortunately, there are currently no courses available.
                    </div>
                  ) : (
                    <div>
                      {coursesByCategory
                        ?.slice(0, 2)
                        .map((course: ICourse, courseIndex: number) => (
                          <Card
                            withBorder
                            className="mt-md rounded-lg p-none"
                            key={courseIndex}
                            onClick={() => navigate(`/course-details-page/${course?._id}`)}
                          >
                            <div className="flex justify-between items-center gap-xs">
                              {/* <div className="h-full w-1/4"> */}
                              <Box maw={139}>
                                <img
                                  onError={errorImageHandler}
                                  src={course?.courseImageUrl ?? DefaultImage}
                                  className="w-full h-full object-fill cursor-pointer"
                                  alt="Course"
                                  style={{ aspectRatio: '141 / 109' }}
                                />
                              </Box>

                              {/* </div> */}
                              <div className="w-3/4">
                                <div className="flex items-center">
                                  <div className="flex flex-col gap-sm">
                                    <p className="text-lg leading-5 font-semibold cursor-pointer text-gray-900 hover:text-blue-500 hover:text-[15px] transition-all">
                                      {course?.courseTitle ?? 'Untitled'}
                                    </p>
                                    <div className="flex items-center gap-xs">
                                      <img
                                        className="cursor-pointer"
                                        src={course?.teacher?.avatar}
                                        alt="Avatar"
                                        style={{ borderRadius: '50%' }}
                                        width="35px"
                                        height="35px"
                                        onError={Avatar}
                                      />
                                      <div className="">
                                        <p className="text-sm font-semibold text-gray-900">
                                          {course?.teacher?.firstName ?? ''}{' '}
                                          {course?.teacher?.lastName}
                                        </p>
                                        <p className="text-sm font-normal text-[#667085]">
                                          {/* {moment(course?.createdAt).format('YYYY/MM/DD') ?? ''} */}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Card>
                        ))}
                    </div>
                  )}
                  {/* <p className="text-tiny font-semibold text-primary-700 mt-lg text-end">
                    Show All
                  </p> */}
                  <Text className="text-primary-1000  font-semibold absolute top-md lg:bottom-sm right-sm">
                    Show all
                  </Text>
                </Grid.Col>
              </Grid>{' '}
            </div>
          </Tabs.Panel>
        ))}
      </Tabs>
    </>
  );
};

export default CourseByCatergory;
