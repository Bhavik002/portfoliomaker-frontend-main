/* eslint-disable array-callback-return */
import React from 'react';
import Project from './Project';

import {
  ChakraProvider,
  Text,
  Input,
  Grid,
  Textarea,
  InputGroup,
  InputLeftAddon,
  Heading,
  FormControl,
  FormErrorMessage,
  Button,
  Code,
  useClipboard,
} from '@chakra-ui/react';
import { CreatableSelect } from 'chakra-react-select';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';

import { ChromePicker } from 'react-color';

const Form = () => {
  const [colorPicker, setColorPicker] = useState({
    background: '#FF5733',
  });

  const [numberOfProjects, setNumberOfProjects] = useState(1);
  const [data, setData] = useState();
  const { onCopy, value, setValue, hasCopied } = useClipboard('');
  let technologies = [
    {
      label: 'Technologies',
      options: [
        { value: 'AdobeXd', label: 'AdobeXd' },
        { value: 'AfterEffects', label: 'AfterEffects' },
        { value: 'Bootstrap', label: 'Bootstrap' },
        { value: 'Css', label: 'Css' },
        { value: 'HTML', label: 'HTML' },
        { value: 'Figma', label: 'Figma' },
        { value: 'Firebase', label: 'Firebase' },
        { value: 'Illustrator', label: 'Illustrator' },
        { value: 'Javascript', label: 'Javascript' },
        { value: 'ReactJs', label: 'ReactJs' },
        { value: 'NextJs', label: 'NextJs' },
        { value: 'NodeJs', label: 'NodeJs' },
        { value: 'Sass', label: 'Sass' },
        { value: 'Tailwind', label: 'Tailwind' },
      ],
    },
  ];

  const {
    handleSubmit,
    control,
    register,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: 'Spiderman',
    },
  });

  function handleAdd() {
    setNumberOfProjects(numberOfProjects + 1);
  }
  async function onSubmit(values) {
    console.log('form', values);
    let updatedData = {
      Color: colorPicker.background ?? '#00FFFF',
      Head: {
        title: values?.name ?? 'Jhon Doe | Frontend Developer & Designer',
        NavbarName: values?.name ?? 'Jhon Doe',
      },
      HomePage: {
        name: values?.name ?? 'Jhon Doe',
        Position: [
          values?.position1,
          values?.position2,
          values?.position3,
          values?.position4,
        ],
        description:
          values?.bio ??
          'I design and build websites that look good, and work well.',
      },
      AboutPage: {
        AboutParagraph:
          values?.description ??
          'I am a frontend developer and designer with a passion for creating beautiful and user-friendly websites and applications. I have a strong background in both web development and graphic design, and I enjoy using my skills to create stunning websites and interfaces that are easy to use and navigate.In my previous work, I have designed and developed websites for a variety of clients, including small businesses, non-profit organizations, and large corporations. I have also created mobile applications and responsive websites that are compatible with a variety of devices and screen sizes. My goal is always to create websites and applications that are visually appealing and user-friendly, and I believe that my skills and experience make me an excellent frontend developer and designer.',
        ImageLink:
          values?.imgLink ??
          'https://cdn.vectorstock.com/i/1000x1000/23/81/default-avatar-profile-icon-vector-18942381.webp',
      },
      Skills: ['Html', 'Bootstrap', 'Figma'],
      Projects: [
        {
          title: values?.projectTitle1 ?? 'Reports',
          ImageLink: values?.projectImgLink1 ?? '',
          Status: values?.name ?? 'Completed',
          ProjectName: values?.name ?? 'Reports',
          Technologies: ['HTML', 'TAILWIND', 'REACT', 'NEXT'],
          Description:
            values?.projectDescription1 ??
            'Write reports for your students in 60 seconds or less',
          DemoLink: values?.projectLink1 ?? '',
        },
      ],
      Contact: {
        Email: values?.email ?? 'johndoe@gmail.com',
        Github:
          `https://github.com/${values?.github}` ??
          'https://github.com/johndoe',
        Twitter:
          `https://twitter.com/${values?.twitter}` ??
          'https://twitter.com/johndoe',
        linkedIn:
          `https://www.linkedin.com/in/${values?.linkedIn}` ??
          'https://twitter.com/johndoe',
      },
    };

    if (values?.skills) {
      let tempArray = [];
      values.skills.forEach((s) => tempArray.push(s.value));
      updatedData.Skills = tempArray;
    }

    if (numberOfProjects > 0) {
      let tempArray = [];

      [...Array(numberOfProjects)].map((e, index) => {
        let proj = {
          title: values[`projectTitle${index}`] ?? 'Reports',
          ImageLink: values[`projectImgLink${index}`] ?? '',
          Status: values[`projectStatus${index}`].value ?? 'Completed',
          ProjectName: values[`projectTitle${index}`] ?? 'Reports',
          Technologies: [],
          Description:
            values[`projectDescription${index}`] ??
            'Write reports for your students in 60 seconds or less',
          DemoLink: values[`projectLink${index}`] ?? '',
        };
        let tempTechArray = [];
        values[`project${index}`].forEach((s) => tempTechArray.push(s.value));
        proj.Technologies = tempTechArray;
        tempArray.push(proj);
      });
      updatedData.Projects = tempArray;
    }
    console.log('data.json', updatedData);
    setData(updatedData);
    const newPerson = { userName: values.name, data: updatedData };

    console.log('newPerson', newPerson);
    // await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/add`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(newPerson),
    // }).catch((error) => {
    //   window.alert(error); 
    //   return;
    // });

  }
  return (
    <ChakraProvider resetCSS>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={errors}>
          <Grid
            className={'Form'}
            id='intro'
            paddingY={'4vh'}
            templateColumns='repeat(1, 1fr)'
            gap={4}
            marginX={'auto'}
            marginTop={'4%'}
            maxW={'80%'}>
            <Heading>Introduction</Heading>
            <Grid templateColumns='repeat(5, 1fr)' gap={1}>
              <div
                className='App'
                style={{ display: 'flex', justifyContent: 'space-around' }}>
                <div>
                  <Text fontWeight={'bold'} width='20vh'>
                    Choose any color:
                  </Text>
                  <div className='sketchpicker'>
                    <ChromePicker
                      id='color'
                      name='color'
                      onChange={({ hex }) => {
                        setColorPicker({ background: hex });
                      }}
                      color={colorPicker.background}
                    />
                  </div>
                </div>
              </div>
            </Grid>
            <Grid templateColumns='repeat(5, 1fr)' gap={1}>
              <Text fontWeight={'bold'} width='20vh'>
                My name is:{' '}
              </Text>
              <Input
                id='name'
                name='name'
                {...register('name', {
                  required: 'This is required',
                })}
                isInvalid={errors?.name ? true : false}
                placeholder='Peter Parker'
              />
              <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
            </Grid>
            <Grid templateColumns='repeat(5, 1fr)' gap={1}>
              <Text fontWeight={'bold'} width='20vh'>
                Positions
              </Text>
              <Input
                id='Position 1'
                name='Position 1'
                variant='flushed'
                {...register('position1', {
                  required: 'This is required',
                })}
                isInvalid={errors?.position1 ? true : false}
                placeholder='Position 1'
              />
              <Input
                id='Position 2'
                name='Position 2'
                variant='flushed'
                {...register('position2', {
                  required: 'This is required',
                })}
                isInvalid={errors?.position2 ? true : false}
                placeholder='Position 2'
              />
              <Input
                id='Position 3'
                name='Position 3'
                variant='flushed'
                {...register('position3', {
                  required: 'This is required',
                })}
                isInvalid={errors?.position3 ? true : false}
                placeholder='Position 3'
              />
              <Input
                id='Position 4'
                name='Position 4'
                variant='flushed'
                {...register('position4', {
                  required: 'This is required',
                })}
                isInvalid={errors?.position4 ? true : false}
                placeholder='Position 4'
              />
            </Grid>
            <Grid templateColumns='repeat(5, 1fr)' gap={14}>
              <Text fontWeight={'bold'} width='20vh'>
                Bio:{' '}
              </Text>
              <Input
                placeholder='I am secretly spiderman'
                id='bio'
                name='bio'
                {...register('bio', {
                  required: 'This is required',
                })}
                isInvalid={errors?.bio ? true : false}
                width='64vh'
                size='md'
                display='block'
              />
            </Grid>
            <Grid templateColumns='repeat(1 1fr)' gap={2}>
              <Text fontWeight={'bold'} width='20vh'>
                Description:{' '}
              </Text>
              <Textarea
                id='description'
                name='description'
                {...register('description', {
                  required: 'This is required',
                })}
                isInvalid={errors?.description ? true : false}
                size='md'
                placeholder='Lorem ispsunLorem ispsunLorem ispsunLorem ispsunLorem ispsunLorem ispsunLorem ispsunLorem ispsunLorem ispsunLorem ispsunLorem ispsunLorem ispsunLorem ispsunLorem ispsunLorem ispsunLorem ispsunLorem ispsunLorem ispsunLorem ispsun'
                minWidth='30vh'
                minHeight='16vh'
              />
              <Grid templateColumns='repeat(5, 1fr)' gap={14}>
                <Text fontWeight={'bold'} width='20vh'>
                  Image Link:{' '}
                </Text>
                <Input
                  id='imgLink'
                  name='imgLink'
                  {...register('imgLink', {
                    required: 'This is required',
                  })}
                  isInvalid={errors?.imgLink ? true : false}
                  placeholder='https://cdn.vectorstock.com/i/1000x1000/23/81/default-avatar-profile-icon-vector-18942381.webp'
                  width='80vh'
                  size='sm'
                  display='block'
                />
              </Grid>
            </Grid>

            <Grid templateColumns='repeat(5, 1fr)' gap={14}>
              <Text fontWeight={'bold'} width='20vh'>
                Skills:
              </Text>

              <Controller
                control={control}
                id='skills'
                name='skills'
                rules={{ required: 'Please enter at least one food group.' }}
                render={({
                  field: { onChange, onBlur, value, name, ref },
                  fieldState: { error },
                }) => (
                  <FormControl width='80vh' isInvalid={!!error} id={'skills'}>
                    <CreatableSelect
                      isMulti
                      name={name}
                      ref={ref}
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      options={technologies}
                      placeholder='Select Technologies'
                      closeMenuOnSelect={false}
                    />
                  </FormControl>
                )}
              />
            </Grid>
          </Grid>
          <Grid
            className={'Form'}
            id='socials'
            paddingY={'4vh'}
            templateColumns='repeat(1, 1fr)'
            gap={4}
            marginX={'auto'}
            marginTop={'4%'}
            maxW={'80%'}>
            <Heading>Socials</Heading>

            <Grid templateColumns='repeat(5, 1fr)' gap={14}>
              <Text fontWeight={'bold'} width='20vh'>
                Email:{' '}
              </Text>
              <Input
                id='email'
                name='email'
                {...register('email', {
                  required: 'This is required',
                })}
                isInvalid={errors?.email ? true : false}
                placeholder='peterparker@gmail.com'
                width='64vh'
                size='md'
                display='block'
              />
            </Grid>
            <Grid templateColumns='repeat(5, 1fr)' gap={14}>
              <Text fontWeight={'bold'} width='20vh'>
                Github:{' '}
              </Text>
              <InputGroup width='64vh'>
                <InputLeftAddon>https://github.com/</InputLeftAddon>
                <Input
                  id='github'
                  name='github'
                  {...register('github', {
                    required: 'This is required',
                  })}
                  isInvalid={errors?.github ? true : false}
                  placeholder='peterparker'
                  width
                />
              </InputGroup>
            </Grid>
            <Grid templateColumns='repeat(5, 1fr)' gap={14}>
              <Text fontWeight={'bold'} width='20vh'>
                LinkedIn:{' '}
              </Text>
              <InputGroup width='64vh'>
                <InputLeftAddon>https://www.linkedin.com/in/</InputLeftAddon>
                <Input
                  id='linkedIn'
                  name='linkedIn'
                  {...register('linkedIn', {
                    required: 'This is required',
                  })}
                  isInvalid={errors?.linkedIn ? true : false}
                  placeholder='peterparker'
                  width
                />
              </InputGroup>
            </Grid>
            <Grid templateColumns='repeat(5, 1fr)' gap={14}>
              <Text fontWeight={'bold'} width='20vh'>
                Twitter:{' '}
              </Text>
              <InputGroup width='64vh'>
                <InputLeftAddon>https://twitter.com/</InputLeftAddon>
                <Input
                  id='twitter'
                  name='twitter'
                  {...register('twitter', {
                    required: 'This is required',
                  })}
                  isInvalid={errors?.twitter ? true : false}
                  placeholder='peterparker'
                  width
                />
              </InputGroup>
            </Grid>
            <Grid
              id='projects'
              paddingY={'4vh'}
              marginBottom={'8vh'}
              templateColumns='repeat(1, 1fr)'
              gap={14}
              display='grid'>
              <Heading>Projects</Heading>

              {
                // Looping same component numberOfProjects times
                [...Array(numberOfProjects)].map((e, index) => (
                  <Project
                    key={index}
                    register={register}
                    errors={errors}
                    control={control}
                    technologies={technologies}
                    id={index}
                  />
                ))
              }
              <Button
                width={128}
                marginX={'auto'}
                marginTop={'4px'}
                bgColor={'#1A202C'}
                color={'#EDF2F7'}
                borderRadius={'6px'}
                _hover={{
                  color: '#1A202C',
                  bgColor: '#A0AEC0',
                }}
                onClick={() => handleAdd()}>
                Add Project
              </Button>
            </Grid>
            <Button
              width={200}
              marginX={'auto'}
              marginTop={-30}
              bgColor={'#0A7CC9'}
              color={'white'}
              isLoading={isSubmitting}
              borderRadius={'6px'}
              _hover={{
                color: '#000000',
                bgColor: '#5DB7F4',
              }}
              type='submit'>
              Submit
            </Button>
          </Grid>
        </FormControl>
      </form>
      {data && (
        <Grid
          paddingBottom={'4vh'}
          templateColumns='repeat(1, 1fr)'
          marginX={'auto'}
          marginTop={'4%'}
          maxW={'100%'}>
          <Code
            marginX={'auto'}
            height={'100vh'}
            width={'100vh'}
            overflow={'scroll'}>
            <Button
              bgColor={'gray.400'}
              color={'white'}
              isLoading={isSubmitting}
              borderRadius={'6px'}
              _hover={{
                color: 'black',
              }}
              float={'right'}
              margin={'4px'}
              onClick={() => {
                setValue(JSON.stringify(data));
                onCopy();
              }}>
              {hasCopied ? 'Copied!' : 'Copy'}
            </Button>

            <pre style={{ margin: '16px' }}>
              {JSON.stringify(data, null, 2)}{' '}
            </pre>
          </Code>
        </Grid>
      )}
    </ChakraProvider>
  );
};

export default Form;
