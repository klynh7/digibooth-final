const Privacy = () => {
  return (
    <>
      <h1 className="text-2xl font-semibold mb-5">Privacy Policy</h1>
          
      <div className="space-y-4 py-10"
        style={{ paddingLeft: '100px', paddingRight: '100px' }}>
        <p className="text-base leading-relaxed text-center">
          At Digibooth, your privacy is our top priority. We only collect data necessary to offer our services.
        </p>
        
        <p className="text-base leading-relaxed text-center">
          If <strong className="font-semibold">not logged in</strong>, all of your photos are processed locally on your device and are not uploaded or saved to any external server.
        </p>
        
        <p className="text-base leading-relaxed text-center">
          If you choose to create an account or be <strong className="font-semibold">logged in</strong>, we collect the information you provide to us, such as your email and username.
          Saved photos and written reviews will be linked to your account. Aside from that, the pictures you take with us will be stored securely.
        </p>
        
        <p className="text-base leading-relaxed text-center">
          We respect your privacy and are committed to protecting it. No cookies or trackers are used on this site.
        </p>
      </div>
    </>   
  );
};

export default Privacy;