import React from "react";

const Map = () => {
  return (
    <div style={{ width: "100%", height: "400px" }} className="border-1 border-gray-400 p-3">
      <iframe
        title="Google Map"
        width="100%"
        height="100%"
        frameBorder="0"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.086281707131!2d-122.41941548468143!3d37.774929779759376!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085814d1edcd5f1%3A0x4c7c1e85c9a8c441!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1625786745123!5m2!1sen!2sus"
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

export default Map;
