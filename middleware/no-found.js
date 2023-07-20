const page = `
<div
  style="
    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    
"
>
  <h1 style="color: #4646e3; text-align: center;">The page you're looking for is not here</h1>
</div>
`;

const pageNotFound = (req, res) => {
  res.status(404).send(page);
};

module.exports = pageNotFound;
