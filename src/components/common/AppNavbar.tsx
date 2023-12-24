/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import { Divider, Header, Text, TextInput, Menu, Burger, Drawer } from '@mantine/core';
import { Logo } from './Logo';
import { useSelector } from 'react-redux';
import { IconChevronRight, IconChevronDown, IconSearch } from '@tabler/icons-react';

import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { APP_ROUTES, BASE_ROUTES } from '../../routes/constants';
import { ProfileMenu } from './ProfileMenu';
import { APP_AUTHTICATION_ROUTES } from '../../routes/constants';
import { APIGetAllChildParentNodes } from '../../api/categories';
import { useDisclosure } from '@mantine/hooks';

export default function AppNavbar() {
  const [searchField, setSearchField] = useState('');
  const userProfile = useSelector((state: any) => state.authReducer.userProfile);
  const [category, setCategory] = useState([]);
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);

  const navigate = useNavigate();

  const handleSearch = (e: any) => {
    if (e.keyCode == 13) {
      navigate(`/${APP_ROUTES.APP_SEARCH_COURSE}?keyword=${searchField}`);
    }
  };

  const access_token = localStorage.getItem('access_token');

  const isStudent = userProfile?.roles?.includes('STUDENT');

  useEffect(() => {
    getCategoryList();
  }, []);
  const getCategoryList = async () => {
    try {
      const response = await APIGetAllChildParentNodes();
      const responseData = response.data; // Extract the data from Axios response
      setCategory(responseData); // Set the data in the state
      console.log(responseData, '@responseData');
    } catch (error) {
      // Handle errors here
      console.error(error);
    }
  };

  const renderSubMenu = (subMenuData: any) => {
    console.log(subMenuData);
    if (!subMenuData || subMenuData.length === 0) {
      return null;
    }

    return (
      <Menu.Dropdown>
        {subMenuData.map((item: any) => (
          <Menu.Item key={item._id}>
            <Menu offset={18} width={250} position="right" trigger="hover">
              <Menu.Target>
                <Text className="flex items-center justify-between">
                  {item.title}
                  {item.childNodes && item.childNodes.length > 0 && (
                    <IconChevronRight size={16} strokeWidth={1} color={'black'} />
                  )}
                </Text>
              </Menu.Target>
              {renderSubMenu(item.childNodes)}
            </Menu>
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    );
  };

  const renderCategoryMenu = () => {
    return (
      <Menu offset={18} width={250} trigger="hover">
        <Menu.Target>
          <span className="flex items-center gap-xs">
            Category <IconChevronDown size={28} strokeWidth={1.5} color={'black'} />{' '}
          </span>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Label>Course Categories</Menu.Label>
          {category?.map((item: any) => (
            <Menu.Item key={item._id}>
              <Menu offset={18} width={250} position="right-start" trigger="hover">
                <Menu.Target>
                  <Text className="flex items-center justify-between">
                    {item.title}
                    {item.childNodes && item.childNodes.length > 0 && (
                      <IconChevronRight size={16} strokeWidth={1} color={'black'} />
                    )}
                  </Text>
                </Menu.Target>
                {renderSubMenu(item.childNodes)}
              </Menu>
            </Menu.Item>
          ))}
        </Menu.Dropdown>
      </Menu>
    );
  };

  return (
    <Header
      height={80}
      className="sticky top-0 z-40 flex justify-between wrapper-x items-center border-b backdrop-blur-xl bg-white/90 dark:bg-blueGray-900"
    >
      <div className="">
        <Logo />
      </div>
      {/* <div className="flex items-center ml-2xl">
        Category <ChevronRight size={16} strokeWidth={1} color={'black'} />
      </div> */}
      <div className=" hidden lg:flex items-center">{renderCategoryMenu()}</div>
      <div className={'flex-grow hidden  lg:flex'}>
        <TextInput
          className={'w-full'}
          placeholder={'Search Everything'}
          onChange={(e) => {
            setSearchField(e.target.value);
          }}
          color={'white'}
          onKeyDown={(e) => handleSearch(e)}
          rightSection={<IconSearch />}
        />
      </div>
      <ProfileMenu />
      <Burger
        opened={drawerOpened}
        onClick={toggleDrawer}
        className="flex lg:hidden items-center"
      />
      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        zIndex={1000000}
      ></Drawer>
      {/* {isStudent ? <Divider orientation="vertical" className="text-primary-700" /> : null} */}
      {!access_token?.length && (
        <Link
          to={
            isStudent
              ? `${BASE_ROUTES.BECOME_TEACHER}`
              : `${BASE_ROUTES.AUTH}/${APP_AUTHTICATION_ROUTES.TEACHER_SIGNUP}`
          }
          className="no-underline hidden lg:flex text-base font-normal"
        >
          Lets Educate
        </Link>
      )}
    </Header>
  );
}
