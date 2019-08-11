export default emails => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const inValidEmails = emails
    .split(",")
    .map(email => email.trim())
    .filter(email => (email ? !re.test(email) : false));
  if (inValidEmails.length) return `These emails are invalid ${inValidEmails}`;
  return null;
};
