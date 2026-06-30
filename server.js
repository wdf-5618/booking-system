const app = require("./src/app"); // ခုနက ဖန်တီးထားတဲ့ app ကို ခေါ်သုံးမယ်
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
