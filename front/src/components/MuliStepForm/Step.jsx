// Step.js
import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Link, Redirect, useLocation } from 'react-router-dom';
import { ArrowLeftShort, ArrowRightShort } from 'react-bootstrap-icons';
import { cloneElement } from 'react';
import { motion } from 'framer-motion'
import CircleLoader from '../CircleLoader/CircleLoader';
const PREV = 'PREV'
const NEXT = 'NEXT'
const Step = ({ title, children, initialValues, validationSchema,isLoading=false, onChange = () => { }, onSubmit, index = 0, setFormData = () => { }, formData, formErrors, validSteps, currentStep, lastPath = null, setActiveStep = () => { }, animationAction = NEXT, setAnimationAction = () => { }, submitButton = null, lastActiveStep = 0, setLastActiveStep = () => { } }) => {
    const [initialFields, setInitialFields] = useState(initialValues)
    const previousStepIsValid = currentStep === 0 || validSteps[currentStep - 1];



    useEffect(() => {
        setFormData(prev => ({ ...prev, ...initialFields }))
    }, [initialFields])

    if (!previousStepIsValid && lastPath) {
        setActiveStep(a => a > 0 ? a - 1 : 0)
    }
    useEffect(() => {
        setActiveStep(index)
    }, [index])
    useEffect(() => {
        return () => {
            setLastActiveStep(index)
        }
    }, [])

    useEffect(() => {
        if (lastActiveStep < index) {
            setAnimationAction('PREV')
        } else {
            setAnimationAction('NEXT')
        }
    }, [lastActiveStep, index])
    return (
        <motion.div
            key={currentStep}
            initial={{ left: animationAction === NEXT ? '100vw' : '-100vw' }}
            animate={{ left: 0, transition: { duration: 0.2 } }}
            exit={{ left: 0 }}
            style={{ position: 'relative' }}
        >
            <Formik

                initialValues={initialFields}
                validationSchema={validationSchema}
                onSubmit={(values, actions) => {
                    onSubmit(values, actions, currentStep)
                }}
                validateOnChange={false}
                validateOnBlur={false}
            >
                {({ values, errors, touched, isValid, handleChange }) => (
                    <Form>
                        <h2 className='multi-form-step-title'>{title}</h2>
                        <div className="body">
                            {
                                cloneElement(children, { formData, setFormData, initialFields, setInitialFields, handleChange, currentStepValues: values, currentStepErrors: errors, touched })
                            }
                        </div>
                        <div className="footer flex align-items-center justify-content-between">
                            <div>
                                {currentStep > 0 && <Link className='btn btn-transparent' to={`../${lastPath}`} ><ArrowLeftShort size={30} /> Previous</Link>}
                            </div>
                            <button className='btn btn-purple next-step-btn' disabled={isLoading} type="submit">
                                {
                                    isLoading ?
                                        <CircleLoader/>
                                    : <>Suivant <ArrowRightShort size={30} /></>
                                }
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </motion.div>

    );
};

export default Step;
