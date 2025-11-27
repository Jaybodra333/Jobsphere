# GitHub Setup Instructions

## Step 1: Create Repository on GitHub
1. Go to https://github.com/new
2. Repository name: `job-portal` (or your preferred name)
3. Description: "Full MERN-stack job portal with admin dashboard"
4. Choose Public or Private
5. **DO NOT** check "Initialize with README" (we already have files)
6. Click "Create repository"

## Step 2: Connect and Push

After creating the repo, run these commands (replace YOUR_USERNAME with your GitHub username):

```bash
cd D:\Project\job-portal

# Add remote (replace YOUR_USERNAME and REPO_NAME)
git remote add origin https://github.com/YOUR_USERNAME/job-portal.git

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

## Alternative: Using SSH (if you have SSH keys set up)

```bash
git remote add origin git@github.com:YOUR_USERNAME/job-portal.git
git branch -M main
git push -u origin main
```

## If you need to authenticate:
- GitHub may ask for your username and password
- For password, use a **Personal Access Token** (not your GitHub password)
- Create token at: https://github.com/settings/tokens
- Select scope: `repo` (full control of private repositories)

