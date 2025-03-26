import { DSAProblem } from "../types";

export const SAMPLE_PROBLEMS: DSAProblem[] = [
  {
    id: "1",
    title: "Two Sum",
    difficulty: "Easy",
    category: "Arrays",
    topic: "Array & Hashing",
    completed: false,
    acceptance: 78,
    companies: ["Amazon", "Google", "Facebook"],
    description: `Given an array of integers \`nums\` and an integer \`target\`, return indices of the two numbers in the array such that they add up to \`target\`.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.`,
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
      },
      {
        input: "nums = [3,2,4], target = 6",
        output: "[1,2]",
        explanation: "Because nums[1] + nums[2] == 6, we return [1, 2].",
      },
    ],
    constraints: [
      "2 <= nums.length <= 104",
      "-109 <= nums[i] <= 109",
      "-109 <= target <= 109",
      "Only one valid answer exists.",
    ],
    starterCode: {
      javascript: `function twoSum(nums, target) {
    // Write your code here
};`,
      python: `def twoSum(nums: List[int], target: int) -> List[int]:
    # Write your code here
    pass`,
      java: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Write your code here
    }
}`,
    },
    testCases: [
      {
        input: "[2,7,11,15], 9",
        expectedOutput: "[0,1]",
      },
      {
        input: "[3,2,4], 6",
        expectedOutput: "[1,2]",
      },
    ],
    list: "neetcode150",
    pattern: "Hash Map",
    videoExplanation: "https://www.youtube.com/watch?v=KLlXCFG5TnA",
    solution: `To solve the Two Sum problem efficiently, we can use a hash map to store the numbers we've seen so far and their indices.

1. Create an empty hash map
2. Iterate through the array:
   - For each element, calculate the complement (target - current number)
   - If the complement exists in the hash map, return the current index and the complement's index
   - Otherwise, add the current number and its index to the hash map
3. If no solution is found, return an empty array

Time Complexity: O(n) where n is the length of the array
Space Complexity: O(n) for storing the hash map

**JavaScript Solution:**

\`\`\`javascript
function twoSum(nums, target) {
    const map = new Map();
    
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        
        map.set(nums[i], i);
    }
    
    return [];
}
\`\`\`

**Python Solution:**

\`\`\`python
def twoSum(nums, target):
    num_map = {}
    
    for i, num in enumerate(nums):
        complement = target - num
        
        if complement in num_map:
            return [num_map[complement], i]
        
        num_map[num] = i
    
    return []
\`\`\`

**Java Solution:**

\`\`\`java
class Solution {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> map = new HashMap<>();
        
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            
            if (map.containsKey(complement)) {
                return new int[] { map.get(complement), i };
            }
            
            map.put(nums[i], i);
        }
        
        return new int[0];
    }
}
\`\`\``,
  },
  {
    id: "2",
    title: "Valid Anagram",
    difficulty: "Easy",
    category: "Strings",
    topic: "Array & Hashing",
    completed: false,
    acceptance: 65,
    companies: ["Amazon", "Microsoft", "Facebook"],
    description: `Given two strings \`s\` and \`t\`, return \`true\` if \`t\` is an anagram of \`s\`, and \`false\` otherwise.

An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.`,
    examples: [
      {
        input: 's = "anagram", t = "nagaram"',
        output: "true",
      },
      {
        input: 's = "rat", t = "car"',
        output: "false",
      },
    ],
    constraints: [
      "1 <= s.length, t.length <= 5 * 10^4",
      "s and t consist of lowercase English letters.",
    ],
    starterCode: {
      javascript: `function isAnagram(s, t) {
    // Write your code here
};`,
      python: `def isAnagram(s: str, t: str) -> bool:
    # Write your code here
    pass`,
      java: `class Solution {
    public boolean isAnagram(String s, String t) {
        // Write your code here
    }
}`,
    },
    testCases: [
      {
        input: '"anagram", "nagaram"',
        expectedOutput: "true",
      },
      {
        input: '"rat", "car"',
        expectedOutput: "false",
      },
    ],
    list: "neetcode150",
    pattern: "Hash Map",
    videoExplanation: "https://www.youtube.com/watch?v=9UtInBqnCgA",
    solution: `To determine if two strings are anagrams, we need to check if they have the same characters with the same frequencies.

There are several approaches to solve this:

1. **Sort both strings and compare**: O(n log n) time complexity
2. **Use a hash map to count characters**: O(n) time complexity

**Hash Map Approach:**
1. If the lengths of the strings are different, return false
2. Create a hash map to count the frequency of each character in the first string
3. Decrement the count for each character in the second string
4. If any count becomes negative or a character in the second string doesn't exist in the map, return false
5. Return true if all counts are zero

**JavaScript Solution:**

\`\`\`javascript
function isAnagram(s, t) {
    if (s.length !== t.length) return false;
    
    const charCount = {};
    
    // Count characters in s
    for (let char of s) {
        charCount[char] = (charCount[char] || 0) + 1;
    }
    
    // Decrement counts for characters in t
    for (let char of t) {
        if (!charCount[char]) return false;
        charCount[char]--;
    }
    
    // Check if all counts are zero
    return Object.values(charCount).every(count => count === 0);
}
\`\`\`

**Python Solution:**

\`\`\`python
def isAnagram(s, t):
    if len(s) != len(t):
        return False
    
    char_count = {}
    
    # Count characters in s
    for char in s:
        char_count[char] = char_count.get(char, 0) + 1
    
    # Decrement counts for characters in t
    for char in t:
        if char not in char_count or char_count[char] == 0:
            return False
        char_count[char] -= 1
    
    return all(count == 0 for count in char_count.values())
\`\`\`

**Java Solution:**

\`\`\`java
class Solution {
    public boolean isAnagram(String s, String t) {
        if (s.length() != t.length()) return false;
        
        int[] counts = new int[26]; // Assuming lowercase English letters only
        
        // Count characters in s
        for (char c : s.toCharArray()) {
            counts[c - 'a']++;
        }
        
        // Decrement counts for characters in t
        for (char c : t.toCharArray()) {
            counts[c - 'a']--;
            if (counts[c - 'a'] < 0) return false;
        }
        
        return true;
    }
}
\`\`\``,
  },
  {
    id: "3",
    title: "Contains Duplicate",
    difficulty: "Easy",
    category: "Arrays",
    topic: "Array & Hashing",
    completed: false,
    acceptance: 70,
    companies: ["Amazon", "Apple", "Google"],
    description: `Given an integer array \`nums\`, return \`true\` if any value appears at least twice in the array, and return \`false\` if every element is distinct.`,
    examples: [
      {
        input: "nums = [1,2,3,1]",
        output: "true",
      },
      {
        input: "nums = [1,2,3,4]",
        output: "false",
      },
    ],
    constraints: ["1 <= nums.length <= 10^5", "-10^9 <= nums[i] <= 10^9"],
    starterCode: {
      javascript: `function containsDuplicate(nums) {
    // Write your code here
};`,
      python: `def containsDuplicate(nums: List[int]) -> bool:
    # Write your code here
    pass`,
      java: `class Solution {
    public boolean containsDuplicate(int[] nums) {
        // Write your code here
    }
}`,
    },
    testCases: [
      {
        input: "[1,2,3,1]",
        expectedOutput: "true",
      },
      {
        input: "[1,2,3,4]",
        expectedOutput: "false",
      },
    ],
    list: "blind75",
    pattern: "Hash Set",
    videoExplanation: "https://www.youtube.com/watch?v=3OamzN90kPg",
    solution: `To determine if an array contains any duplicates, we need to check if any value appears more than once.

The most efficient approach is to use a hash set:

1. Create an empty hash set
2. Iterate through the array:
   - If the current element is already in the set, return true (duplicate found)
   - Otherwise, add the current element to the set
3. If we finish iterating without finding duplicates, return false

Time Complexity: O(n) where n is the length of the array
Space Complexity: O(n) for storing the hash set

**JavaScript Solution:**

\`\`\`javascript
function containsDuplicate(nums) {
    const seen = new Set();
    
    for (const num of nums) {
        if (seen.has(num)) {
            return true;
        }
        seen.add(num);
    }
    
    return false;
}
\`\`\`

**Python Solution:**

\`\`\`python
def containsDuplicate(nums):
    seen = set()
    
    for num in nums:
        if num in seen:
            return True
        seen.add(num)
    
    return False
\`\`\`

**Java Solution:**

\`\`\`java
class Solution {
    public boolean containsDuplicate(int[] nums) {
        Set<Integer> seen = new HashSet<>();
        
        for (int num : nums) {
            if (seen.contains(num)) {
                return true;
            }
            seen.add(num);
        }
        
        return false;
    }
}
\`\`\``,
  },
  {
    id: "4",
    title: "Valid Parentheses",
    difficulty: "Easy",
    category: "Strings",
    topic: "Stack",
    completed: false,
    acceptance: 68,
    companies: ["Google", "Microsoft", "Amazon"],
    description: `Given a string \`s\` containing just the characters \`'('\`, \`')'\`, \`'{'\`, \`'}'\`, \`'['\` and \`']'\`, determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.`,
    examples: [
      {
        input: 's = "()"',
        output: "true",
      },
      {
        input: 's = "()[]{}"',
        output: "true",
      },
      {
        input: 's = "(]"',
        output: "false",
      },
    ],
    constraints: [
      "1 <= s.length <= 10^4",
      "s consists of parentheses only '()[]{}'",
    ],
    starterCode: {
      javascript: `function isValid(s) {
    // Write your code here
};`,
      python: `def isValid(s: str) -> bool:
    # Write your code here
    pass`,
      java: `class Solution {
    public boolean isValid(String s) {
        // Write your code here
    }
}`,
    },
    testCases: [
      {
        input: '"()"',
        expectedOutput: "true",
      },
      {
        input: '"()[]{}"',
        expectedOutput: "true",
      },
      {
        input: '"(]"',
        expectedOutput: "false",
      },
    ],
    list: "neetcode150",
    pattern: "Stack",
    videoExplanation: "https://www.youtube.com/watch?v=WTzjTskDFMg",
    solution: `To determine if a string of parentheses is valid, we need to ensure that each opening bracket has a matching closing bracket in the correct order.

The classic approach is to use a stack:

1. Create an empty stack
2. Iterate through each character in the string:
   - If it's an opening bracket ('(', '{', '['), push it onto the stack
   - If it's a closing bracket (')', '}', ']'):
     - If the stack is empty, return false (no matching opening bracket)
     - Pop the top element from the stack
     - If the popped element is not the matching opening bracket, return false
3. After processing all characters, return true if the stack is empty (all brackets matched)

Time Complexity: O(n) where n is the length of the string
Space Complexity: O(n) for the stack in the worst case

**JavaScript Solution:**

\`\`\`javascript
function isValid(s) {
    const stack = [];
    const pairs = {
        ')': '(',
        '}': '{',
        ']': '['
    };
    
    for (const char of s) {
        if (char === '(' || char === '{' || char === '[') {
            stack.push(char);
        } else {
            if (stack.length === 0 || stack.pop() !== pairs[char]) {
                return false;
            }
        }
    }
    
    return stack.length === 0;
}
\`\`\`

**Python Solution:**

\`\`\`python
def isValid(s):
    stack = []
    pairs = {')': '(', '}': '{', ']': '['}
    
    for char in s:
        if char in '({[':
            stack.append(char)
        else:
            if not stack or stack.pop() != pairs[char]:
                return False
    
    return len(stack) == 0
\`\`\`

**Java Solution:**

\`\`\`java
class Solution {
    public boolean isValid(String s) {
        Stack<Character> stack = new Stack<>();
        Map<Character, Character> pairs = Map.of(
            ')', '(',
            '}', '{',
            ']', '['
        );
        
        for (char c : s.toCharArray()) {
            if (c == '(' || c == '{' || c == '[') {
                stack.push(c);
            } else {
                if (stack.isEmpty() || stack.pop() != pairs.get(c)) {
                    return false;
                }
            }
        }
        
        return stack.isEmpty();
    }
}
\`\`\``,
  },
  {
    id: "5",
    title: "Group Anagrams",
    difficulty: "Medium",
    category: "Strings",
    topic: "Array & Hashing",
    completed: false,
    acceptance: 65,
    companies: ["Amazon", "Microsoft", "Facebook"],
    description: `Given an array of strings \`strs\`, group the anagrams together. You can return the answer in any order.

An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.`,
    examples: [
      {
        input: 'strs = ["eat","tea","tan","ate","nat","bat"]',
        output: '[["bat"],["nat","tan"],["ate","eat","tea"]]',
      },
      {
        input: 'strs = [""]',
        output: '[[""]]',
      },
      {
        input: 'strs = ["a"]',
        output: '[["a"]]',
      },
    ],
    constraints: [
      "1 <= strs.length <= 10^4",
      "0 <= strs[i].length <= 100",
      "strs[i] consists of lowercase English letters",
    ],
    starterCode: {
      javascript: `function groupAnagrams(strs) {
    // Write your code here
};`,
      python: `def groupAnagrams(strs: List[str]) -> List[List[str]]:
    # Write your code here
    pass`,
      java: `class Solution {
    public List<List<String>> groupAnagrams(String[] strs) {
        // Write your code here
    }
}`,
    },
    testCases: [
      {
        input: '["eat","tea","tan","ate","nat","bat"]',
        expectedOutput: '[["bat"],["nat","tan"],["ate","eat","tea"]]',
      },
      {
        input: '[""]',
        expectedOutput: '[[""]]',
      },
    ],
    list: "neetcode150",
    pattern: "Hash Map",
    videoExplanation: "https://www.youtube.com/watch?v=vzdNOK2oB2E",
    solution: `To group anagrams together, we need to identify which strings are anagrams of each other. Anagrams have the same characters with the same frequencies.

The key insight is to create a unique key for each anagram group. There are two common approaches:

1. **Sort each string** and use the sorted string as a key
2. **Count character frequencies** and use that count as a key

**Approach 1: Sorting**

Time Complexity: O(n * k log k) where n is the number of strings and k is the maximum length of a string
Space Complexity: O(n * k)

**JavaScript Solution:**

\`\`\`javascript
function groupAnagrams(strs) {
    const map = new Map();
    
    for (const str of strs) {
        const sortedStr = str.split('').sort().join('');
        
        if (!map.has(sortedStr)) {
            map.set(sortedStr, []);
        }
        
        map.get(sortedStr).push(str);
    }
    
    return Array.from(map.values());
}
\`\`\`

**Python Solution:**

\`\`\`python
def groupAnagrams(strs):
    anagram_groups = {}
    
    for s in strs:
        sorted_s = ''.join(sorted(s))
        
        if sorted_s not in anagram_groups:
            anagram_groups[sorted_s] = []
            
        anagram_groups[sorted_s].append(s)
    
    return list(anagram_groups.values())
\`\`\`

**Approach 2: Character Count**

Time Complexity: O(n * k) where n is the number of strings and k is the maximum length of a string
Space Complexity: O(n * k)

**Python Solution (Character Count):**

\`\`\`python
def groupAnagrams(strs):
    anagram_groups = {}
    
    for s in strs:
        # Create a count array for lowercase letters
        count = [0] * 26
        
        # Count each character
        for c in s:
            count[ord(c) - ord('a')] += 1
        
        # Convert count array to tuple to use as dictionary key
        key = tuple(count)
        
        if key not in anagram_groups:
            anagram_groups[key] = []
            
        anagram_groups[key].append(s)
    
    return list(anagram_groups.values())
\`\`\`

**Java Solution:**

\`\`\`java
class Solution {
    public List<List<String>> groupAnagrams(String[] strs) {
        Map<String, List<String>> map = new HashMap<>();
        
        for (String str : strs) {
            char[] chars = str.toCharArray();
            Arrays.sort(chars);
            String sortedStr = new String(chars);
            
            if (!map.containsKey(sortedStr)) {
                map.put(sortedStr, new ArrayList<>());
            }
            
            map.get(sortedStr).add(str);
        }
        
        return new ArrayList<>(map.values());
    }
}
\`\`\``,
  },
];
