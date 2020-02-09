---
title: "Programming Interview Insights"
date: "June 26, 2018"
description: "Some interesting programming Interview Insights with example questions and answers"
---


# Programming Interview Insights
Hi all, this week’s post will be about some interesting questions and answers I encountered while preparing for a job interview.

A few months ago my wife and I decided to permanently immigrate to Canada. The date is getting close, so I started to interview for positions in the Toronto area. In order to prepare for the programming questions, I reviewed a lot of data from various sites that suppose to prepare you for an interview.

There are a few common algorithms which you are expected to use while solving most of these questions. Therefore, I decided to summarize some of them and include examples of questions and their solution.

## Binary search
This is probably the most useful algorithm to use. Binary search has a complexity of  `O(log(n))`, is easy to implement and can be modified for different uses.  We will usually use it when we need to locate a variable in an ordered array. Another use will be to insert a variable into a data structure which we need to keep ordered. This way we will have the same complexity of O(log(n)) on both retrieving or inserting values into the data structure.

A simple Java implementation of binary search:
```
int binarySearch(int arr[], int l, int r, int x) {
    if (r>=l) {
        int mid = l + (r - l)/2;
        if (arr[mid] == x) {
            return mid;
		  }
        if (arr[mid] > x) {
            return binarySearch(arr, l, mid-1, x);
		  }
        return binarySearch(arr, mid+1, r, x);
    }
    return -1;
}
```


## Sorting
My favourite sorting algorithms are merge sort and quick sort. Both work in a similar way by the “divide and conquer” strategy. In merge sort, we divide the list into many small pieces which we order and then merge into an ordered list. Quick-sort similarly divides the list around a pivot value and works from there. It will be beneficial in some questions to first sort the data and use binary search after the sort. This way the maximum complexity will be O(nlog(n)). A more detailed explanation on both sorts and a code for their implementation can be found in the following links:  [quick sort](https://www.geeksforgeeks.org/quick-sort/)  ,  [merge sort](https://www.geeksforgeeks.org/merge-sort/) .

## Trees
In most interview questions you won’t need to actually implement anything that is more complex than a binary tree. You should still know the basic principals of other tree types thought (such as red/black trees, n-array trees, and symmetric trees) in case you will be asked to explain them.

It is required to be able to implement different ways of  [tree traversal](https://www.tutorialspoint.com/data_structures_algorithms/tree_traversal.htm)  as well as sorting of a binary tree.

## Q & A
Here are some questions I encountered which were useful in removing some cobwebs.
One important thing though is to solve the questions with no modern IDE as it can be the time-consuming factor that will decide the success of your interview.

**Q1**: You have to rotate the image in-place, which means you have to modify the input 2D matrix directly. DO NOT allocate another 2D matrix and do the rotation.

```
public void rotate1(int[][] matrix) {
    if (matrix.length==0 || matrix.length==1) {
        return;
	  }
    int n = matrix.length;
    for (int I=0;i<n;i++) {
        for (int j=i; j<n; j++) {
            int temp = matrix[j][I];
            matrix[j][I] = matrix[I][j];
            matrix[I][j] = temp;
        }
    }
    for (int I=0; i<n; i++) {
        for (int j=0; j<n/2; j++) {
            int temp = matrix[I][j];
            matrix[I][j] = matrix[I][n-1-j];
            matrix[I][n-1-j] = temp;
        }
    }
}
```

**Q2**: Given a non-empty array of integers, every element appears twice except for one. Find that single one.

```
public static int singleNumber (int[] nums) {
    return Arrays.stream(nums).reduce((x, y) -> ^y).getAsInt();
}
```

**Q3**: Given a singly linked list, determine if it is a palindrome.

```
public boolean isPalindrome(ListNode head) {
    ListNode fast = head, slow = head;
    while (fast != null && fast.next != null) {
        fast = fast.next.next;
        slow = slow.next;
    }
    if (fast != null) { 
        slow = slow.next;
    }
    slow = reverse(slow);
    fast = head;

    while (slow != null) {
        if (fast.val != slow.val) {
            return false;
        }
        fast = fast.next;
        slow = slow.next;
    }
    return true;
}
```


**Q4**: Reverse a singly linked list.

```
public ListNode reverseList(ListNode head) {
   ListNode prev = null;
   ListNode curr = head;
   while( curr!=null){
      ListNode next = curr.next;
      curr.next= prev;
      prev = curr;
      curr = next;
   }
   return prev;
}
```

**Q5**: Given an array where elements are sorted in ascending order, convert it to a height balanced BST.

```
public TreeNode sortedArrayToBST(int[] num) {
   if (num.length == 0) {
      return null;
   }
   TreeNode head = sortedArrayToBSTInner(num, 0, num.length - 1);
   return head;
}

public TreeNode sortedArrayToBSTInner(int[] num, int low, int high) {
   if (low > high) { // Done
      return null;
   }
   int mid = (low + high) / 2;
   TreeNode node = new TreeNode(num[mid]);
   node.left = sortedArrayToBSTInner(num, low, mid - 1);
   node.right = sortedArrayToBSTInner(num, mid + 1, high);
   return node;
}
```

**Q6**: Given a binary tree, check whether it is a mirror of itself (ie, symmetric around its centre).

```
public boolean isSymmetric(TreeNode root) {
    return root==null || isSymmetricHelp(root.left, root.right);
}

private boolean isSymmetricHelp(TreeNode left, TreeNode right){
    if(left==null || right==null)
        return left==right;
    if(left.val!=right.val)
        return false;
    return isSymmetricHelp(left.left, right.right) && isSymmetricHelp(left.right, right.left);
}
```


#home/blog/02-programming-interview-insights