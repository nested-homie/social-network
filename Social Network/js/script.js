// Sample posts data
const posts = [
    {
        id: 1,
        author: "John Doe",
        authorImg: "images/profile.jpg",
        time: "2 hours ago",
        content: "This is a sample post content. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        image: "images/post1.jpg",
        likes: 15,
        comments: 3,
        shares: 2
    },
    {
        id: 2,
        author: "Jane Smith",
        authorImg: "images/contact1.jpg",
        time: "4 hours ago",
        content: "Another sample post with different content.",
        image: "images/post2.jpg",
        likes: 8,
        comments: 1,
        shares: 0
    }
];

// Sample contacts data
const contacts = [
    {
        name: "Jane Smith",
        image: "images/contact1.jpg",
        online: true
    },
    {
        name: "Mike Johnson",
        image: "images/contact2.jpg",
        online: false
    },
    {
        name: "Sarah Wilson",
        image: "images/contact3.jpg",
        online: true
    }
];

// Function to create a post element
function createPostElement(post) {
    const postElement = document.createElement('div');
    postElement.className = 'post';
    postElement.innerHTML = `
        <div class="post-header">
            <img src="${post.authorImg}" alt="Profile">
            <div class="post-info">
                <h3>${post.author}</h3>
                <p>${post.time}</p>
            </div>
        </div>
        <div class="post-content">
            <p>${post.content}</p>
            <img src="${post.image}" alt="Post Image">
        </div>
        <div class="post-actions">
            <button onclick="handleLike(${post.id})">
                <i class="fas fa-thumbs-up"></i> Like (${post.likes})
            </button>
            <button onclick="handleComment(${post.id})">
                <i class="fas fa-comment"></i> Comment (${post.comments})
            </button>
            <button onclick="handleShare(${post.id})">
                <i class="fas fa-share"></i> Share (${post.shares})
            </button>
        </div>
    `;
    return postElement;
}

// Function to create a contact element
function createContactElement(contact) {
    const contactElement = document.createElement('div');
    contactElement.className = 'contact';
    contactElement.innerHTML = `
        <img src="${contact.image}" alt="Contact">
        <p>${contact.name}</p>
        ${contact.online ? '<span class="online-indicator"></span>' : ''}
    `;
    return contactElement;
}

// Function to handle like action
function handleLike(postId) {
    const post = posts.find(p => p.id === postId);
    if (post) {
        post.likes++;
        updatePost(postId);
    }
}

// Function to handle comment action
function handleComment(postId) {
    const comment = prompt('Enter your comment:');
    if (comment) {
        const post = posts.find(p => p.id === postId);
        if (post) {
            post.comments++;
            updatePost(postId);
        }
    }
}

// Function to handle share action
function handleShare(postId) {
    const post = posts.find(p => p.id === postId);
    if (post) {
        post.shares++;
        updatePost(postId);
        alert('Post shared successfully!');
    }
}

// Function to update post display
function updatePost(postId) {
    const post = posts.find(p => p.id === postId);
    if (post) {
        const postElement = document.querySelector(`.post[data-id="${postId}"]`);
        if (postElement) {
            const newPostElement = createPostElement(post);
            postElement.replaceWith(newPostElement);
        }
    }
}

// Function to handle post creation
function handleCreatePost() {
    const postInput = document.querySelector('.create-post-input input');
    const content = postInput.value.trim();
    
    if (content) {
        const newPost = {
            id: posts.length + 1,
            author: "John Doe",
            authorImg: "images/profile.jpg",
            time: "Just now",
            content: content,
            image: "images/post1.jpg",
            likes: 0,
            comments: 0,
            shares: 0
        };
        
        posts.unshift(newPost);
        const mainContent = document.querySelector('.main-content');
        const createPost = document.querySelector('.create-post');
        const postElement = createPostElement(newPost);
        mainContent.insertBefore(postElement, createPost.nextSibling);
        postInput.value = '';
    }
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    // Add posts to the page
    const mainContent = document.querySelector('.main-content');
    const createPost = document.querySelector('.create-post');
    
    posts.forEach(post => {
        const postElement = createPostElement(post);
        mainContent.insertBefore(postElement, createPost.nextSibling);
    });
    
    // Add contacts to the page
    const contactList = document.querySelector('.contact-list');
    contacts.forEach(contact => {
        const contactElement = createContactElement(contact);
        contactList.appendChild(contactElement);
    });
    
    // Add event listener for post creation
    const postInput = document.querySelector('.create-post-input input');
    postInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleCreatePost();
        }
    });
});

// Add online status indicator styles
const style = document.createElement('style');
style.textContent = `
    .online-indicator {
        width: 8px;
        height: 8px;
        background-color: #31a24c;
        border-radius: 50%;
        position: absolute;
        bottom: 0;
        right: 0;
    }
    
    .contact {
        position: relative;
    }
`;
document.head.appendChild(style);

// Signup Form Handling
const signupForm = document.getElementById('signup-form');
if (signupForm) {
    // Password strength indicator
    const passwordInput = document.getElementById('password');
    const strengthBar = document.querySelector('.strength-bar');
    const strengthText = document.querySelector('.strength-text');

    passwordInput.addEventListener('input', function() {
        const password = this.value;
        let strength = 0;
        
        if (password.length >= 8) strength += 25;
        if (password.match(/[a-z]/)) strength += 25;
        if (password.match(/[A-Z]/)) strength += 25;
        if (password.match(/[0-9]/)) strength += 25;
        
        strengthBar.style.width = strength + '%';
        
        if (strength <= 25) {
            strengthBar.style.backgroundColor = '#ff4d4d';
            strengthText.textContent = 'Weak';
        } else if (strength <= 50) {
            strengthBar.style.backgroundColor = '#ffa64d';
            strengthText.textContent = 'Fair';
        } else if (strength <= 75) {
            strengthBar.style.backgroundColor = '#ffd24d';
            strengthText.textContent = 'Good';
        } else {
            strengthBar.style.backgroundColor = '#4CAF50';
            strengthText.textContent = 'Strong';
        }
    });

    // Profile picture preview
    const profilePictureInput = document.getElementById('profile-picture');
    const uploadPreview = document.querySelector('.upload-preview');

    profilePictureInput.addEventListener('change', function() {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                uploadPreview.innerHTML = `
                    <img src="${e.target.result}" alt="Profile Preview" style="width: 80px; height: 80px; border-radius: 50%; object-fit: cover;">
                    <span>Change picture</span>
                `;
            }
            reader.readAsDataURL(file);
        }
    });

    // Form submission
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const fullname = document.getElementById('fullname').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        const profilePicture = document.getElementById('profile-picture').files[0];
        const terms = document.getElementById('terms').checked;

        // Validation
        if (password !== confirmPassword) {
            showError('Passwords do not match!');
            return;
        }

        if (!terms) {
            showError('Please agree to the Terms of Service and Privacy Policy');
            return;
        }

        // Here you would typically send this data to your backend server
        // For now, we'll just store it in localStorage as a demo
        const userData = {
            fullname,
            email,
            password, // In a real app, never store plain passwords
            profilePicture: profilePicture ? URL.createObjectURL(profilePicture) : 'https://randomuser.me/api/portraits/men/32.jpg'
        };

        // Store user data
        localStorage.setItem('userData', JSON.stringify(userData));
        
        // Show success message
        showSuccess('Account created successfully! Redirecting...');
        
        // Redirect to index page after a short delay
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);
    });
}

// Error message display
function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.innerHTML = `
        <i class="fas fa-exclamation-circle"></i>
        ${message}
    `;
    
    const form = document.querySelector('.signup-form');
    form.insertBefore(errorDiv, form.firstChild);
    
    setTimeout(() => {
        errorDiv.remove();
    }, 3000);
}

// Success message display
function showSuccess(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.innerHTML = `
        <i class="fas fa-check-circle"></i>
        ${message}
    `;
    
    const form = document.querySelector('.signup-form');
    form.insertBefore(successDiv, form.firstChild);
} 