# Node.js Alpine (ပေါ့ပါးတဲ့ version) ကို သုံးခြင်း
FROM node:20-alpine

# Container ထဲမှာ အလုပ်လုပ်မယ့် Folder
WORKDIR /app

# Dependency တွေကို အရင် Install လုပ်ခြင်း
COPY package*.json ./
RUN npm install

# ကျန်တဲ့ Code တွေကို Copy ကူးခြင်း
COPY . .

# App ပွင့်မယ့် Port
EXPOSE 3000

# App ကို စတင်မယ့် Command
CMD ["node", "index.js"]