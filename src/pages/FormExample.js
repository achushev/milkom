import React, { useContext } from 'react'

import {
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    InputLabel,
    MenuItem,
    Radio,
    RadioGroup,
    Select,
    TextField,
} from '@material-ui/core'
import { Field, Formik } from 'formik'
import * as Yup from 'yup'

import { GlobalStateContext } from '../providers/GlobalStateProvider'

const ValidationSchema = Yup.object().shape({
    age: Yup.string().oneOf(['20'], '20 required'),
    name: Yup.string()
        .min(5, 'Too Short, minimum 5 required!')
        .max(10, 'Too Long, max 10 required!')
        .required('Name is required'),
    test_checkbox: Yup.boolean().oneOf([true], 'Must Accept Terms and Conditions'),
    radio_group: Yup.string().oneOf(['yes'], 'Must say Yes!'),
})

export const FormExample = () => {
    const { setPageTitle } = useContext(GlobalStateContext)
    setPageTitle('Form example')


    return (
        <Formik
            initialValues={{
                age: 10,
                name: '',
                test_checkbox: false,
                radio_group: 'no',
            }}
            validationSchema={ValidationSchema}
            onSubmit={(values, actions) => {
                alert(JSON.stringify(values, null, 2))
                actions.setSubmitting(false)
            }}
        >
            {({ values, errors, touched, handleSubmit, handleChange, handleBlur, handleReset, isSubmitting }) => (
                <form onSubmit={handleSubmit}>
                    <div>
                        <FormControl>
                            <InputLabel htmlFor="age-simple">Age</InputLabel>
                            <Select
                                value={values.age}
                                onChange={handleChange}
                                inputProps={{
                                    name: 'age',
                                    id: 'age-simple',
                                }}
                            >
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                        {errors.age && touched.age && <div id="feedback">{errors.age}</div>}
                    </div>
                    <div>
                        <TextField
                            id="name"
                            label="Name"
                            value={values.name}
                            onChange={handleChange}
                            margin="normal"
                            variant="outlined"
                        />
                        {errors.name && touched.name && <div id="feedback">{errors.name}</div>}
                    </div>
                    <div>
                        <Field
                            name="test_checkbox"
                            type="checkbox"
                            render={({ field, form }) => {
                                return (
                                    <FormControlLabel
                                        control={<Checkbox checked={field.value} {...field} />}
                                        label="Terms and Conditions"
                                    />
                                )
                            }}
                        />
                        {errors.test_checkbox && touched.test_checkbox && (
                            <div id="feedback">{errors.test_checkbox}</div>
                        )}
                    </div>
                    <div>
                        <RadioGroup
                            aria-label="position"
                            name="radio_group"
                            value={values.radio_group}
                            onChange={handleChange}
                            row
                        >
                            <FormControlLabel
                                value="yes"
                                control={<Radio color="primary" />}
                                label="Yes"
                                labelPlacement="start"
                            />
                            <FormControlLabel
                                value="no"
                                control={<Radio color="primary" />}
                                label="No"
                                labelPlacement="start"
                            />
                        </RadioGroup>
                        {errors.radio_group && touched.radio_group && <div id="feedback">{errors.radio_group}</div>}
                    </div>
                    <Button variant="contained" type="submit">
                        Submit
                    </Button>
                </form>
            )}
        </Formik>
    )
}
