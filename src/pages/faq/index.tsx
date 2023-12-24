/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import {
  createStyles,
  Image,
  Accordion,
  Grid,
  Col,
  Container,
  Title,
  Avatar,
  Button,
} from '@mantine/core';
import image from '../../assets/faq.jpg';
import { Plus } from '../../utils/assets/image';
import { Ifaq } from '../../utils/interfaces/Course.model';
import { useNavigate } from 'react-router-dom';

const useStyles = createStyles((theme) => ({
  wrapper: {
    paddingTop: +theme.spacing.xl * 2,
    paddingBottom: +theme.spacing.xl * 2,
  },

  title: {
    marginBottom: theme.spacing.md,
    paddingLeft: theme.spacing.md,
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },

  item: {
    fontSize: theme.fontSizes.sm,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7],
  },
}));

const placeholder =
  'It can’t help but hear a pin drop from over half a mile away, so it lives deep in the mountains where there aren’t many people or Pokémon.';

const FrequentlyAskedQuestions = (props: any) => {
  const { classes } = useStyles();
  console.log(props, 'props');
  const navigate = useNavigate();
  const getInTouch = () => {
    navigate(`/contact`);
  };
  return (
    <div className="">
      <div className={classes.wrapper}>
        <Container size="lg">
          <Grid gutter={50}>
            <Col>
              <Title
                order={2}
                align="left"
                className="text-4xl font-semibold mb-normal text-center"
              >
                Frequently Asked Questions
              </Title>
              <p className="text-xl font-normal text-center">
                Everything you need to know about the product and billing.
              </p>
              <Accordion
                className="mt-2xl"
                chevron={<img src={Plus} />}
                styles={{
                  chevron: {
                    '&[data-rotate]': {
                      transform: 'rotate(45deg)',
                    },
                  },
                }}
              >
                {props.coursefaq?.map((value: any, index: number) => (
                  <Accordion.Item
                    value={index.toString()}
                    className="mb-lg border-b-indigo-500"
                    key={index}
                  >
                    <Accordion.Control>
                      <span className="text-lg font-medium">
                        {value?.question ?? ' Is there a free trial available?'}
                      </span>
                    </Accordion.Control>
                    <Accordion.Panel>
                      <span className="font-normal text-base">
                        {value?.answer ??
                          ' Yes, you can try us for free for 30 days. If you want, we’ll provide you'}
                      </span>
                    </Accordion.Panel>
                  </Accordion.Item>
                ))}
                {/* <Accordion.Item value="flexibility" className="mb-lg border-b-indigo-500">
                  <Accordion.Control>
                    <span className="text-lg font-extrabold">Can I change my plan later?</span>
                  </Accordion.Control>
                  <Accordion.Panel>
                    <span className="font-normal text-base">
                      Yes, you can try us for free for 30 days. If you want, we’ll provide you with
                      a free, personalized 30-minute onboarding call to get you up and running as
                      soon as possible.
                    </span>
                  </Accordion.Panel>
                </Accordion.Item>
                <Accordion.Item value="flexibility2" className="mb-lg border-b-indigo-500">
                  <Accordion.Control>
                    <span className="text-lg  font-extrabold">Can I my plan later?</span>
                  </Accordion.Control>
                  <Accordion.Panel>
                    <span className="font-normal text-base">
                      Yes, you can try us for free for 30 days. If you want, we’ll provide you with
                      a free, personalized 30-minute onboarding call to get you up and running as
                      soon as possible.
                    </span>
                  </Accordion.Panel>
                </Accordion.Item> */}
              </Accordion>
            </Col>
          </Grid>
        </Container>
        <div className="my-6xl rounded-lg p-3xl" style={{ backgroundColor: '#0F83FE' }}>
          <div className="">
            <Avatar.Group spacing="sm" className="justify-center items-center">
              <Avatar
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80"
                radius="xl"
              />
              <Avatar
                src="https://avatars.githubusercontent.com/u/10353856?v=4"
                radius="xl"
                className="w-[56px] h-[56px]"
              />
              <Avatar
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80"
                radius="xl"
              />
            </Avatar.Group>
          </div>
          <div className="text-center mt-[32px]">
            <p className="font-medium text-xl text-white">Still have questions?</p>
            <p className="text-lg font-normal mt-[8px] text-white">
              Can’t find the answer you’re looking for? Please chat to our friendly team.
            </p>
            <Button className="mt-[32px] " variant="outline">
              <p className="text-white text-base font-medium" onClick={getInTouch}>
                {' '}
                Get in touch{' '}
              </p>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrequentlyAskedQuestions;
