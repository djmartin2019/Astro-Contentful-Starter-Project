// Multi-tag filtering functionality for blog page
(function() {
  'use strict';
  
  function TagFilter() {
    this.selectedTags = new Set();
    this.allButton = document.getElementById('tag-all');
    this.tagButtons = document.querySelectorAll('[data-tag]:not([data-tag="all"])');
    this.postItems = document.querySelectorAll('.post-item');
    this.resultsCount = document.querySelector('.text-gray-600');
    
    console.log('TagFilter elements found:', {
      allButton: !!this.allButton,
      tagButtons: this.tagButtons.length,
      postItems: this.postItems.length,
      resultsCount: !!this.resultsCount
    });
    
    this.init();
  }

  TagFilter.prototype.init = function() {
    var self = this;
    
    // Add click event listeners
    if (this.allButton) {
      this.allButton.addEventListener('click', function() {
        self.toggleAll();
      });
    }
    
    this.tagButtons.forEach(function(button) {
      button.addEventListener('click', function() {
        self.toggleTag(button.dataset.tag);
      });
    });

    // Initialize with URL parameters if any
    var urlParams = new URLSearchParams(window.location.search);
    var tagParam = urlParams.get('tag');
    if (tagParam) {
      var tags = tagParam.split(',').map(function(t) { return t.trim(); }).filter(function(t) { return t; });
      tags.forEach(function(tag) {
        self.toggleTag(tag);
      });
    }
  };

  TagFilter.prototype.toggleAll = function() {
    this.selectedTags.clear();
    this.updateButtonStates();
    this.filterPosts();
  };

  TagFilter.prototype.toggleTag = function(tag) {
    if (tag === 'all') {
      this.toggleAll();
      return;
    }

    if (this.selectedTags.has(tag)) {
      this.selectedTags.delete(tag);
    } else {
      this.selectedTags.add(tag);
    }

    this.updateButtonStates();
    this.filterPosts();
  };

  TagFilter.prototype.updateButtonStates = function() {
    var self = this;
    
    // Update "All Posts" button
    if (this.allButton) {
      if (this.selectedTags.size === 0) {
        this.allButton.className = 'px-4 py-2 rounded-full text-sm font-medium transition-colors bg-primary-600 text-white';
      } else {
        this.allButton.className = 'px-4 py-2 rounded-full text-sm font-medium transition-colors bg-gray-100 text-gray-700 hover:bg-gray-200';
      }
    }

    // Update individual tag buttons
    this.tagButtons.forEach(function(button) {
      var tag = button.dataset.tag;
      if (self.selectedTags.has(tag)) {
        button.className = 'px-4 py-2 rounded-full text-sm font-medium transition-colors bg-primary-600 text-white';
      } else {
        button.className = 'px-4 py-2 rounded-full text-sm font-medium transition-colors bg-gray-100 text-gray-700 hover:bg-gray-200';
      }
    });
  };

  TagFilter.prototype.filterPosts = function() {
    var self = this;
    var visibleCount = 0;

    this.postItems.forEach(function(post) {
      var postTags = (post.dataset.tags || '').split(',').filter(function(tag) { 
        return tag.trim() !== ''; 
      });
      
      if (self.selectedTags.size === 0) {
        // Show all posts
        post.style.display = 'block';
        post.style.opacity = '1';
        post.style.transform = 'scale(1)';
        visibleCount++;
      } else {
        // Check if post has any of the selected tags
        var hasSelectedTag = Array.from(self.selectedTags).some(function(selectedTag) {
          return postTags.includes(selectedTag);
        });
        
        if (hasSelectedTag) {
          post.style.display = 'block';
          post.style.opacity = '1';
          post.style.transform = 'scale(1)';
          visibleCount++;
        } else {
          // Fade out and scale down before hiding
          post.style.opacity = '0';
          post.style.transform = 'scale(0.95)';
          setTimeout(function() {
            post.style.display = 'none';
          }, 300);
        }
      }
    });

    // Update results count
    if (this.resultsCount) {
      if (this.selectedTags.size === 0) {
        this.resultsCount.textContent = 'Showing all posts (' + visibleCount + ' total)';
      } else {
        var selectedTagsArray = Array.from(this.selectedTags);
        var tagsText = selectedTagsArray.length === 1 
          ? '"' + selectedTagsArray[0] + '"' 
          : '"' + selectedTagsArray.join('", "') + '"';
        this.resultsCount.textContent = 'Showing posts tagged with ' + tagsText + ' (' + visibleCount + ' total)';
      }
    }

    // Update URL without page refresh
    this.updateURL();
  };

  TagFilter.prototype.updateURL = function() {
    var url = new URL(window.location.href);
    
    if (this.selectedTags.size === 0) {
      url.searchParams.delete('tag');
    } else {
      var selectedTagsArray = Array.from(this.selectedTags);
      url.searchParams.set('tag', selectedTagsArray.join(','));
    }
    
    // Update URL without page refresh
    window.history.replaceState({}, '', url.toString());
  };

  // Initialize tag filtering when DOM is loaded
  function initTagFilter() {
    try {
      console.log('Initializing tag filter...');
      new TagFilter();
      console.log('Tag filter initialized successfully');
    } catch (error) {
      console.error('Error initializing tag filter:', error);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTagFilter);
  } else {
    // DOM already loaded
    initTagFilter();
  }
})();
