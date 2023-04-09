import React from 'react';
import {
  Text,
  Input,
  Grid,
  Textarea,
  InputGroup,
  FormControl,
} from '@chakra-ui/react';
import { Select, CreatableSelect } from 'chakra-react-select';
import { Controller } from 'react-hook-form';

const Project = ({ register, errors, technologies, control, id }) => {
  return (
    <>
      <Grid
        templateColumns='repeat(1, 1fr)'
        gap={4}
        width='96vh'
        justifySelf={'center'}>
        <Text fontSize={'2xl'} fontWeight={'extrabold'} width='32vh'>
          {`Project ${id + 1}`}:{' '}
        </Text>
        <InputGroup width='90vh'>
          <Text fontWeight={'bold'} display='block' width='26vh'>
            Project Title:{' '}
          </Text>
          <Input
            id={`projectTitle${id}`}
            name={`projectTitle${id}`}
            {...register(`projectTitle${id}`, {
              required: 'This is required',
            })}
            isInvalid={errors[`projectTitle${id}`] ? true : false}
            placeholder='Notes'
            width='64vh'
          />
        </InputGroup>
        <InputGroup width='90vh'>
          <Text fontWeight={'bold'} display='block' width='26vh'>
            Project Description:{' '}
          </Text>
          <Textarea
            id={`projectDescription${id}`}
            name={`projectDescription${id}`}
            {...register(`projectDescription${id}`, {
              required: 'This is required',
            })}
            isInvalid={errors[`projectDescription${id}`] ? true : false}
            placeholder='Lorem ispsum'
            width='64vh'
          />
        </InputGroup>
        <InputGroup width='90vh'>
          <Text fontWeight={'bold'} display='block' width='26vh'>
            Demo Link:{' '}
          </Text>
          <Input
            id={`projectLink${id}`}
            name={`projectLink${id}`}
            {...register(`projectLink${id}`, {
              required: 'This is required',
            })}
            isInvalid={errors[`projectLink${id}`] ? true : false}
            placeholder='demoNotes.com'
            width='64vh'
          />
        </InputGroup>
        <InputGroup width='90vh'>
          <Text fontWeight={'bold'} display='block' width='26vh'>
            Image Link:{' '}
          </Text>
          <Input
            id={`projectImgLink${id}`}
            name={`projectImgLink${id}`}
            {...register(`projectImgLink${id}`, {
              required: 'This is required',
            })}
            isInvalid={errors[`projectImgLink${id}`] ? true : false}
            placeholder='NotesImage.jpg'
            width='64vh'
          />
        </InputGroup>
        <InputGroup width='90vh'>
          <Text fontWeight={'bold'} display='block' width='26vh'>
            Technologies:{' '}
          </Text>
          <Controller
            control={control}
            name={`project${id}`}
            rules={{ required: 'Select Technologies' }}
            render={({
              field: { onChange, onBlur, value, name, ref },
              fieldState: { error },
            }) => (
              <FormControl width='64vh' isInvalid={!!error} id={`project${id}`}>
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
        </InputGroup>
        <InputGroup width='90vh'>
          <Text fontWeight={'bold'} display='block' width='26vh'>
            Status:{' '}
          </Text>
          <Controller
            control={control}
            name={`projectStatus${id}`}
            rules={{ required: 'Project Status required' }}
            render={({
              field: { onChange, onBlur, value, name, ref },
              fieldState: { error },
            }) => (
              <FormControl
                width='36%'
                isInvalid={!!error}
                id={`projectStatus${id}`}>
                <Select
                  name={name}
                  ref={ref}
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  options={[
                    { value: 'Completed', label: 'Completed' },
                    { value: 'Working On it', label: 'Working On it' },
                  ]}
                  placeholder='Project status'
                  selectedOptionColor='green'
                  isSearchable={false}
                />
              </FormControl>
            )}
          />
          {/* <Select
                icon={<ChevronDownIcon />}
                width={'36%'}
                variant='outline'
                size='md'>
                <option value='Completed'>Completed</option>
                <option value='Working On it'>Working On it</option>
              </Select> */}
        </InputGroup>
      </Grid>
    </>
  );
};

export default Project;
