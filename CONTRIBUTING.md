# Contributing to pinnacles

Thank you for taking the time to contribute! You can help in two ways: by suggesting a resource or by improving the code.

## Table of Contents
1. [Suggest a Resource](#1-suggest-a-resource)  
2. [Improve the Code](#2-improve-the-code)  
    - [Getting Set Up](#getting-set-up)  
    - [Set up Environment Variables](#set-up-environment-variables)  
    - [Install Dependencies and Run the Project](#install-dependencies-and-run-the-project)  
    - [Make Your Changes](#make-your-changes)  
    - [Submit a Pull Request](#submit-a-pull-request)  
    - [Review Process](#review-process)  

## Suggest a Resource  

If you know a great resource that would be a good fit, we’d love to hear about it!  

### How to Suggest a Resource:  
1. Visit [pinnacles.app](https://pinnacles.app).  
2. Click the **+ Suggest Resource** button in the navbar.  
3. Fill out the form with the resource details as best as you can.  
   - Metadata (like title, description, and tags) is automatically fetched from the link you provide. Feel free to edit any pre-filled fields if needed.  
   - If the resource doesn't have an associated image, you have two options:  
     - **Option 1:** Take a screenshot of the resource’s webpage, upload it to an image hosting platform (e.g., [ImgBB](https://imgbb.com/) or [Imgur](https://imgur.com/upload)), copy the image URL, and paste it into the **Image URL** field.  
     - **Option 2:** Use our designated placeholder image. Simply enter `./images/placeholder.png` into the **Image URL** field.  

Once you’ve completed the form, submit it, and we’ll review your suggestion!  

> _Note: We may edit your submission details (e.g., title, description, tags, or image) to ensure consistency and maintain the quality of the collection._  


## Improve the Code

We welcome any improvements or suggestions for enhancing the project. Your contributions are greatly appreciated!

### Getting Set Up

1. **Fork:** Start by [forking the repo](https://github.com/EthanL06/pinnacles/fork).
2. **Clone:** Clone your forked repository to your local machine:
```bash
git clone https://github.com/your-username/pinnacles.git
cd pinnacles
```

3. **Set up Environment Variables**: The project requires specific environment variables for Firebase and (optionally) an OpenAI API key to run correctly:
   ### Firebase
   - Create a [new Firebase project](https://console.firebase.google.com/u/0/)
   - Add `Firebase Firestore` and `Authentication` to the project
   - Copy your Firebase SDK config details from the Firebase console settings.
   - In the project directory, create a `.env.local` file with the following configuration (replace the placeholder values with your actual Firebase config):
     
     ```dotenv
     NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key-here
     NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain-here
     NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id-here
     NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-storage-bucket-here
     NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id-here
     NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id-here
     ```
   ### OpenAI API (optional)
   > _Note: The OpenAI API setup is optional. If you choose not to set it up, the only feature that will not function properly is the automatic tag generation when submitting a resource._
   - Go to your [OpenAI account settings](https://platform.openai.com/settings/) and copy your API key.
   - In the project directory, create a `.env` file and add the following (replace your-api-key-here with your actual OpenAI API key):

     ```dotenv
     OPENAI_API_KEY=your-api-key-here
     
     ```

5. **Install Dependencies and Run the Project**: Once your environment is set up, you need to install the necessary dependencies and start the development server. In your terminal, run the following commands:
   ```bash
   pnpm install
   pnpm dev
   ```

6. **Make your Changes**: Now that the project is running locally, you can make changes, fix bugs, or add new features. Be sure to test your changes thoroughly before submitting a pull request.
   - When adding a new feature or fixing an issue, create a new branch to keep your work organized:
     
     ```bash
     git checkout -b feature/your-feature-name
     
     ```

7. **Submit a Pull Request**: Once you’re happy with your changes, push them to your fork and submit a pull request with a clear description of what you’ve modified or added.
    - Make sure you've committed all your changes locally, then push them to your forked repository on GitHub:
     
       ```bash
       git push origin feature/my-new-feature
       ```
    - Go to the [pinnacles repository](https://github.com/EthanL06/pinnacles/) and click “Compare & pull request”.
    - Provide a clear description of your changes (e.g., what was added, fixed, or changed).
    - Click “Create pull request” to submit for review.

### Review Process

Once you’ve submitted your pull request, I will review it as soon as possible. If necessary, I may request changes or clarifications before merging. You can also respond to feedback directly in the pull request discussion.
