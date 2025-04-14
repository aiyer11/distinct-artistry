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
    cateringLocation: '',
    talentList: [{
      name: '',
      servicesRequested: '',
      specialInstructions: ''
    }],
    jobCode: '',
    sendInvoiceTo: '',
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

    const talentText = formData.talentList
    .filter(talent => talent.name || talent.servicesRequested)
    .map((talent, index) => 
      `Talent #${index + 1}:<br>` +
      `• Name: ${talent.name || 'Not specified'}<br>` +
      `• Services: ${talent.servicesRequested || 'Not specified'}<br>` +
      `• Instructions: ${talent.specialInstructions || 'None'}<br>`
    )
    .join('\n') || 'No talent information provided';

    const templateParams = {
      // Regular fields
      eventName: formData.eventName,
      jobDate: formData.jobDate,
      jobLocation: formData.jobLocation,
      jobAddress: formData.jobAddress,
      artistSetupLocation: formData.artistSetupLocation,
      onsitePOC: formData.onsitePOC,
      callTime: formData.callTime,
      endTime: formData.endTime,
      cateringProvided: formData.cateringProvided || 'No',
      cateringLocation: formData.cateringProvided === 'Yes' 
        ? formData.cateringLocation 
        : 'Not applicable',
    
      // Modified talent list structure
      talentText: talentText,
      jobCode:formData.jobCode,
      sendInvoiceTo:formData.sendInvoiceTo
    };

    console.log('Template Params Structure:', {
      ...templateParams
    });
    
    emailjs.send(
        'service_svu0bjm',
        'template_vntx7mw',
        templateParams,
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
            cateringLocation: '',
            talentList: [{
              name: '',
              servicesRequested: '',
              specialInstructions: ''
            }],
            jobCode: '',
            sendInvoiceTo: ''
        });
      }, (error) => {
        console.error('Failed to send email:', error);
        setSubmitStatus('error');
      })
      .finally(() => {
        setIsSubmitting(false);
      });
    };

    const handleTalentChange = (index, e) => {
      const { name, value } = e.target;
      const updatedTalent = [...formData.talentList];
      updatedTalent[index][name] = value;
      setFormData({...formData, talentList: updatedTalent});
    };
    
    const addTalentField = () => {
      setFormData({
        ...formData,
        talentList: [...formData.talentList, { name: '', servicesRequested: '', specialInstructions: '' }]
      });
    };
    
    const removeTalentField = (index) => {
      const updatedTalent = [...formData.talentList];
      updatedTalent.splice(index, 1);
      setFormData({...formData, talentList: updatedTalent});
    };

  return (
    <div className="event-form-container">
      <div className="form-logo-container">
        <img src='Distinct Logo.jpg' alt="Distinct Logo"className="form-logo"/>
     </div>
      <h2>Remote Template</h2>
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

        <div className="talent-section full-width">
          <h3>Talent List</h3>
          
          {formData.talentList.map((talent, index) => (
            <div key={index} className="talent-entry">
              <div className="talent-input-group">
                <div className="form-group talent-field">
                  <label>Name</label>
                  <input
                    type="text"
                    name="name"
                    value={talent.name}
                    onChange={(e) => handleTalentChange(index, e)}
                    required
                  />
                </div>
                
                <div className="form-group talent-field">
                  <label>Services Requested</label>
                  <input
                    type="text"
                    name="servicesRequested"
                    value={talent.servicesRequested}
                    onChange={(e) => handleTalentChange(index, e)}
                    required
                  />
                </div>
                
                <div className="form-group talent-field">
                  <label>Special Instructions</label>
                  <input
                    type="text"
                    name="specialInstructions"
                    value={talent.specialInstructions}
                    onChange={(e) => handleTalentChange(index, e)}
                    required
                  />
                </div>
              </div>
              
              {formData.talentList.length > 1 && (
                <div className="remove-btn-container">
                  <button
                    type="button"
                    className="remove-talent-btn"
                    onClick={() => removeTalentField(index)}
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>
          ))}
          
          <button
            type="button"
            className="add-talent-btn"
            onClick={addTalentField}
          >
            + Add Another Talent
          </button>
        </div>

                {/* Job Code and Invoice Email - Revised */}
        <div className="dual-field-group full-width">
          <div className="form-group">
            <label htmlFor="jobCode">Job Code:</label>
            <input
              type="text"
              id="jobCode"
              name="jobCode"
              value={formData.jobCode}
              onChange={handleChange}
              className="light-gray-field"
              style={{ width: '100%' }}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="sendInvoiceTo">Send Invoice To:</label>
            <input
              type="email"
              id="sendInvoiceTo"
              name="sendInvoiceTo"
              value={formData.sendInvoiceTo}
              onChange={handleChange}
              className="light-gray-field"
              style={{ width: '100%' }}
            />
          </div>
        </div>

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