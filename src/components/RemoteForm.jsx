import React, { useState } from 'react';
import './RemoteForm.css';
import emailjs from '@emailjs/browser';

const RemoteForm = () => {
  const [formData, setFormData] = useState({
    eventName: '',
    jobDate: '',
    jobLocation: '',
    jobAddress: '',
    artistSetupLocation: '',
    onsitePOC: '',
    callTime: '',
    endTime: '',
    cateringProvided: '',
    cateringLocation: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    emailjs.send(
        'service_svu0bjm',
        'template_vntx7mw',
        formData,
        '-WTcB5w8p5vo3Hqtv'
      )
      .then((response) => {
        setSubmitStatus('success');
        setFormData({
            eventName: '',
            jobDate: '',
            jobLocation: '',
            jobAddress: '',
            artistSetupLocation: '',
            onsitePOC: '',
            callTime: '',
            endTime: '',
            cateringProvided: '',
            cateringLocation: ''
        });
      }, (error) => {
        console.error('Failed to send email:', error);
        setSubmitStatus('error');
      })
      .finally(() => {
        setIsSubmitting(false);
      });
    };

  return (
    <div className="event-form-container">
      <h2>Event Details Form</h2>
      <form onSubmit={handleSubmit}>
        {/* Event Name */}
        <div className="form-group">
          <label htmlFor="eventName">Name of Event:</label>
          <input
            type="text"
            id="eventName"
            name="eventName"
            value={formData.eventName}
            onChange={handleChange}
            required
          />
        </div>
        
        {/* Job Date */}
        <div className="form-group">
          <label htmlFor="jobDate">Job Date:</label>
          <input
            type="date"
            id="jobDate"
            name="jobDate"
            value={formData.jobDate}
            onChange={handleChange}
            required
          />
        </div>
        
        {/* Job Location */}
        <div className="form-group">
          <label htmlFor="jobLocation">Job Location:</label>
          <input
            type="text"
            id="jobLocation"
            name="jobLocation"
            value={formData.jobLocation}
            onChange={handleChange}
            required
          />
        </div>
        
        {/* Job Address */}
        <div className="form-group">
          <label htmlFor="jobAddress">Job Address:</label>
          <input
            type="text"
            id="jobAddress"
            name="jobAddress"
            value={formData.jobAddress}
            onChange={handleChange}
            required
          />
        </div>
        
        {/* Artist/Stylist Setup Location */}
        <div className="form-group">
          <label htmlFor="artistSetupLocation">Artist/Stylist Set Up Location:</label>
          <input
            type="text"
            id="artistSetupLocation"
            name="artistSetupLocation"
            value={formData.artistSetupLocation}
            onChange={handleChange}
            required
          />
        </div>
        
        {/* On Site POC */}
        <div className="form-group">
          <label htmlFor="onsitePOC">On Site Point of Contact:</label>
          <input
            type="text"
            id="onsitePOC"
            name="onsitePOC"
            value={formData.onsitePOC}
            onChange={handleChange}
            required
          />
        </div>
        
        {/* Call Time */}
        <div className="form-group">
          <label htmlFor="callTime">Call Time:</label>
          <input
            type="time"
            id="callTime"
            name="callTime"
            value={formData.callTime}
            onChange={handleChange}
            required
          />
        </div>
        
        {/* End Time */}
        <div className="form-group">
          <label htmlFor="endTime">End Time:</label>
          <input
            type="time"
            id="endTime"
            name="endTime"
            value={formData.endTime}
            onChange={handleChange}
            required
          />
        </div>
        
        {/* Catering Services */}
        <div className="form-group">
          <label>Catering or Craft Services Supplied:</label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="cateringProvided"
                value="Yes"
                checked={formData.cateringProvided === 'Yes'}
                onChange={handleChange}
                required
              /> Yes
            </label>
            <label>
              <input
                type="radio"
                name="cateringProvided"
                value="No"
                checked={formData.cateringProvided === 'No'}
                onChange={handleChange}
              /> No
            </label>
          </div>
        </div>
        
        {/* Catering Location (conditionally shown) */}
        {formData.cateringProvided === 'Yes' && (
          <div className="form-group">
            <label htmlFor="cateringLocation">Location of Catering/Craft Services:</label>
            <input
              type="text"
              id="cateringLocation"
              name="cateringLocation"
              value={formData.cateringLocation}
              onChange={handleChange}
              required={formData.cateringProvided === 'Yes'}
            />
          </div>
        )}
        
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit Event Details'}
        </button>
        
        {submitStatus === 'success' && (
          <p className="success-message">Form submitted successfully!</p>
        )}
        {submitStatus === 'error' && (
          <p className="error-message">Failed to submit form. Please try again.</p>
        )}
      </form>
    </div>
  ); 
};
export default RemoteForm;