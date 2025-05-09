# Instructions for Pushing Code to GitHub

Since we encountered authentication issues with the automatic push, here are the steps to push the code manually:

## Option 1: Using HTTPS with Personal Access Token

1. Create a Personal Access Token (PAT) on GitHub:
   - Go to GitHub.com and log in
   - Click on your profile picture in the top right corner
   - Go to Settings > Developer settings > Personal access tokens > Generate new token
   - Give it a name, select the "repo" scope, and click "Generate token"
   - Copy the token immediately (you won't be able to see it again)

2. Set the remote URL with your username:
   ```bash
   git remote set-url origin https://Moundir177:<YOUR_PERSONAL_ACCESS_TOKEN>@github.com/Moundir177/FPRA.Droits.git
   ```

3. Push the code:
   ```bash
   git push -u origin master
   ```

## Option 2: Using SSH

1. Generate an SSH key if you don't have one:
   ```bash
   ssh-keygen -t ed25519 -C "your_email@example.com"
   ```

2. Add the SSH key to the ssh-agent:
   ```bash
   eval "$(ssh-agent -s)"
   ssh-add ~/.ssh/id_ed25519
   ```

3. Add the SSH key to your GitHub account:
   - Copy the SSH key to your clipboard:
     ```bash
     pbcopy < ~/.ssh/id_ed25519.pub
     ```
   - Go to GitHub.com and log in
   - Click on your profile picture > Settings > SSH and GPG keys > New SSH key
   - Paste your key and save

4. Change the remote URL to use SSH:
   ```bash
   git remote set-url origin git@github.com:Moundir177/FPRA.Droits.git
   ```

5. Push the code:
   ```bash
   git push -u origin master
   ```

## Option 3: GitHub CLI

1. Install GitHub CLI:
   ```bash
   # For macOS
   brew install gh
   ```

2. Authenticate with GitHub:
   ```bash
   gh auth login
   ```

3. Push the code:
   ```bash
   gh repo create Moundir177/FPRA.Droits --public --source=. --push
   ```

Choose the option that works best for you. After successful authentication, your code will be pushed to the GitHub repository. 