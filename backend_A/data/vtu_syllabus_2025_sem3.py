"""
VTU Scheme 2025 - 3rd Semester Computer Science and Engineering (CSE) Syllabus Data
Source: Official Visvesvaraya Technological University (VTU) Belagavi Curriculum 2025
"""

VTU_2025_SEM3_CSE_SYLLABUS = {
    "university": "Visvesvaraya Technological University (VTU)",
    "scheme": "2025 Scheme",
    "branch": "Computer Science and Engineering",
    "semester": "3rd Semester",
    "subjects": [
        {
            "code": "1BCS305",
            "title": "Data Structures and Applications",
            "credits": 3,
            "type": "PCC",
            "modules": [
                {
                    "module_number": 1,
                    "title": "Module-1: Introduction, Pointers & Sparse Matrices",
                    "hours": 8,
                    "topics": [
                        "Data Structures Classifications (Primitive & Non-Primitive)",
                        "Pointers and Dynamic Memory Allocation",
                        "Arrays and Dynamically Allocated Arrays",
                        "Structures and Unions, Polynomials",
                        "Sparse Matrices: Representation and Transposing a Matrix"
                    ]
                },
                {
                    "module_number": 2,
                    "title": "Module-2: Stacks and Queues",
                    "hours": 8,
                    "topics": [
                        "Stacks: Definition, Operations, Array Representation",
                        "Stacks using Dynamic Arrays",
                        "Stack Applications: Polish Notation, Infix to Postfix Conversion",
                        "Evaluation of Postfix Expression",
                        "Queues: Definition, Array Representation, Queue Operations"
                    ]
                },
                {
                    "module_number": 3,
                    "title": "Module-3: Linked Lists & Circular Queues",
                    "hours": 9,
                    "topics": [
                        "Circular Queues & Circular Queues using Dynamic Arrays",
                        "Multiple Stacks and Queues",
                        "Singly Linked Lists and Chains, Representing Chains in C",
                        "Linked Stacks and Queues, Additional List Operations",
                        "Doubly Linked Lists & Sparse Matrix Representation via Linked Lists"
                    ]
                },
                {
                    "module_number": 4,
                    "title": "Module-4: Trees & Binary Search Trees",
                    "hours": 9,
                    "topics": [
                        "Trees: Introduction, Terminology, Binary Trees & Properties",
                        "Array and Linked Representation of Binary Trees",
                        "Binary Tree Traversals (Preorder, Inorder, Postorder)",
                        "Threaded Binary Trees",
                        "Binary Search Trees: Definition, Searching, Insertion, Deletion, Counting Binary Trees"
                    ]
                },
                {
                    "module_number": 5,
                    "title": "Module-5: Graphs, Hashing & Priority Queues",
                    "hours": 8,
                    "topics": [
                        "Graphs: Graph Abstract Data Type, Elementary Graph Operations (BFS, DFS)",
                        "Static Hashing and Dynamic Hashing",
                        "Priority Queues: Single and Double Ended Priority Queues",
                        "Leftist Trees"
                    ]
                }
            ],
            "textbooks": [
                "Ellis Horowitz, Sartaj Sahni, and Susan Anderson-Freed, 'Fundamentals of Data Structures in C', 2nd Ed, Universities Press, 2023."
            ],
            "reference_books": [
                "Seymour Lipschutz, 'Data Structures Schaum's Outlines', McGraw-Hill, 2014.",
                "Aaron M Tenenbaum, 'Data Structures using C', Pearson Education, 2019.",
                "Reema Thareja, 'Data Structures Using C', 3rd Ed., Oxford Press, 2012."
            ]
        },
        {
            "code": "1BCS304",
            "title": "Operating Systems",
            "credits": 3,
            "type": "PCC",
            "modules": [
                {
                    "module_number": 1,
                    "title": "Module-1: Introduction to OS & System Structures",
                    "hours": 9,
                    "topics": [
                        "What Operating Systems Do, Computer System Organization & Architecture",
                        "Operating System Structure & Operations",
                        "Process, Memory, and Storage Management Overview",
                        "User - OS Interface, System Calls & Types of System Calls",
                        "System Programs & OS Design and Implementation"
                    ]
                },
                {
                    "module_number": 2,
                    "title": "Module-2: Process Management & CPU Scheduling",
                    "hours": 8,
                    "topics": [
                        "Process Concept, Process Scheduling, Operations on Processes, Inter-process Communication (IPC)",
                        "Multi-threaded Programming: Overview, Models, Thread Libraries, Threading Issues",
                        "Process Scheduling: Basic Concepts, Scheduling Criteria",
                        "Scheduling Algorithms: FCFS, SJF, Round Robin, Priority",
                        "Thread Scheduling & Multiple-Processor Scheduling"
                    ]
                },
                {
                    "module_number": 3,
                    "title": "Module-3: Process Synchronization & Deadlocks",
                    "hours": 9,
                    "topics": [
                        "Process Synchronization: Critical Section Problem, Peterson's Solution",
                        "Synchronization Hardware, Semaphores, Classical Problems of Synchronization (Producer-Consumer, Reader-Writer)",
                        "Deadlocks: System Model, Deadlock Characterization (Coffman Conditions)",
                        "Methods for Handling Deadlocks, Deadlock Prevention",
                        "Deadlock Avoidance (Banker's Algorithm), Deadlock Detection and Recovery"
                    ]
                },
                {
                    "module_number": 4,
                    "title": "Module-4: Memory Management & Virtual Memory",
                    "hours": 8,
                    "topics": [
                        "Memory Management Strategies: Swapping, Contiguous Memory Allocation (First fit, Best fit, Worst fit)",
                        "Paging, Structure of Page Table, Segmentation",
                        "Virtual Memory Management: Demand Paging, Copy-on-Write",
                        "Page Replacement Algorithms (FIFO, LRU, Optimal)",
                        "Allocation of Frames & Thrashing"
                    ]
                },
                {
                    "module_number": 5,
                    "title": "Module-5: File System & Mass Storage Structure",
                    "hours": 8,
                    "topics": [
                        "File System: File Concept, Access Methods, Directory & Disk Structure, Mounting, Sharing",
                        "Implementing File System: File System Structure, Directory Implementation, Allocation Methods, Free Space Management",
                        "Mass Storage Structure: Disk Structure, Disk Attachment, Disk Scheduling (SCAN, LOOK, FCFS, SSTF)",
                        "Swap-Space Management"
                    ]
                }
            ],
            "textbooks": [
                "Abraham Silberschatz, Peter Baer Galvin, Greg Gagne, 'Operating System Principles', 9th edition, Wiley-India, 2015."
            ],
            "reference_books": [
                "Ann McHoes, Ida M Flynn, 'Understanding Operating System', Cengage Learning, 7th Edition.",
                "D.M Dhamdhere, 'Operating Systems: A Concept Based Approach', 3rd Ed, McGraw-Hill, 2013.",
                "William Stallings, 'Operating Systems: Internals and Design Principles', 7th Edition, Pearson."
            ]
        },
        {
            "code": "1BCS302",
            "title": "Object Oriented Programming with Java",
            "credits": 4,
            "type": "IPCC",
            "modules": [
                {
                    "module_number": 1,
                    "title": "Module-1: Java Overview, Data Types, Arrays & Control Statements",
                    "hours": 9,
                    "topics": [
                        "Overview of Java: Two Paradigms, Abstraction, Three OOP Principles, Blocks of Code, Lexical Issues",
                        "Data Types, Variables, and Arrays: Primitive Types, Type Conversion & Casting, Automatic Type Promotion",
                        "Operators: Arithmetic, Relational, Boolean Logical, Assignment, Ternary Operator, Precedence",
                        "Control Statements: Selection Statements (if, switch), Iteration (while, do-while, for, for-each)",
                        "Jump Statements: break, continue, return"
                    ]
                },
                {
                    "module_number": 2,
                    "title": "Module-2: Classes, Objects & Methods",
                    "hours": 8,
                    "topics": [
                        "Class Fundamentals, Declaring Objects, Reference Variables, Methods, Constructors",
                        "The 'this' Keyword and Garbage Collection",
                        "Overloading Methods, Objects as Parameters, Argument Passing, Returning Objects",
                        "Recursion, Access Control (public, private, protected), Understanding static and final",
                        "Nested and Inner Classes"
                    ]
                },
                {
                    "module_number": 3,
                    "title": "Module-3: Inheritance, Packages & Interfaces",
                    "hours": 9,
                    "topics": [
                        "Inheritance Basics, Using super, Multilevel Hierarchy, Constructor Execution Order",
                        "Method Overriding, Dynamic Method Dispatch, Abstract Classes, final with Inheritance",
                        "Packages: Creating Packages, Access Protection, Importing Packages",
                        "Interfaces: Defining Interfaces, Default Methods, Static Methods, Private Interface Methods"
                    ]
                },
                {
                    "module_number": 4,
                    "title": "Module-4: Exception Handling & Multithreaded Programming",
                    "hours": 8,
                    "topics": [
                        "Exception Handling: Fundamentals, Exception Types, try and catch, Multiple catch Clauses",
                        "Nested try, throw, throws, finally, Built-in Exceptions, Custom Exception Subclasses",
                        "Multithreaded Programming: Java Thread Model, Main Thread, Creating Threads (Thread class & Runnable)",
                        "isAlive() and join(), Thread Priorities, Thread Synchronization & States"
                    ]
                },
                {
                    "module_number": 5,
                    "title": "Module-5: Enumerations, Autoboxing & Generics",
                    "hours": 8,
                    "topics": [
                        "Enumerations: Fundamentals, values() and valueOf() Methods",
                        "Type Wrappers (Character, Boolean, Numeric) & Autoboxing/Unboxing in Expressions",
                        "Generics: Simple Generics Example, Generic Class with Two Parameters",
                        "General Form of a Generic Class & Bounded Types"
                    ]
                }
            ],
            "textbooks": [
                "Herbert Schildt and Danny Coward, 'Java: The Complete Reference', 13th Edition, McGraw-Hill, 2024."
            ],
            "reference_books": [
                "Cay S. Horstmann, 'Core Java Volume I – Fundamentals', 14th Edition, Oracle Press, 2026.",
                "E. Balagurusamy, 'Programming with Java', 7th Edition, McGraw-Hill Education, 2024."
            ]
        },
        {
            "code": "1BCS303",
            "title": "Digital Design and Computer Organization",
            "credits": 4,
            "type": "PCC",
            "modules": [
                {
                    "module_number": 1,
                    "title": "Module-1: Boolean Algebra & Gate-Level Minimization",
                    "hours": 12,
                    "topics": [
                        "Boolean Algebra: Theorems, Properties, Functions, Logic Gates, Integrated Circuits",
                        "Gate-Level Minimization: Map Method, Four-Variable K-Map",
                        "Product of Sums Simplification, Don't-Care Conditions",
                        "NAND and NOR Implementation"
                    ]
                },
                {
                    "module_number": 2,
                    "title": "Module-2: Combinational Logic & Sequential Logic",
                    "hours": 12,
                    "topics": [
                        "Combinational Logic: Analysis and Design Procedure, Binary Adder-Subtractor",
                        "Decoders, Encoders, Multiplexers",
                        "Synchronous Sequential Logic: Latches and Flip-Flops (SR, JK, D, T)"
                    ]
                },
                {
                    "module_number": 3,
                    "title": "Module-3: Basic Structure of Computers & Machine Instructions",
                    "hours": 10,
                    "topics": [
                        "Functional Units, Basic Operational Concepts, Bus Structure, Performance",
                        "Instruction Set: CISC vs RISC, Performance Measurement",
                        "Machine Instructions: Memory Location & Addresses, Memory Operations",
                        "Instruction Sequencing and Addressing Modes"
                    ]
                },
                {
                    "module_number": 4,
                    "title": "Module-4: I/O Organization & Memory System",
                    "hours": 12,
                    "topics": [
                        "Input/Output Organization: Accessing I/O Devices, Interrupts, Handling Multiple Devices",
                        "Direct Memory Access (DMA), Buses",
                        "The Memory System: Semiconductor RAM, ROM, Cache Memories & Mapping Functions (Direct, Associative, Set-Associative)"
                    ]
                },
                {
                    "module_number": 5,
                    "title": "Module-5: Basic Processing Unit & Pipelining",
                    "hours": 10,
                    "topics": [
                        "Basic Processing Unit: Execution of Complete Instruction, Multiple Bus Organization, Hardwired Control",
                        "Pipelining: Basic Concepts, Role of Cache Memory, Pipeline Performance & Hazards"
                    ]
                }
            ],
            "textbooks": [
                "M. Morris Mano & Michael D. Ciletti, 'Digital Design', 6th edition, Pearson Education.",
                "Carl Hamacher, Zvonko Vranesic, Safwat Zaky, 'Computer Organization', 5th Edition, Tata McGraw Hill."
            ],
            "reference_books": [
                "Charles H Roth and Larry L Kinney, 'Analog and Digital Electronics', Cengage Learning.",
                "William Stallings, 'Computer Organization & Architecture', 11th Edition, Pearson, 2015."
            ]
        },
        {
            "code": "1BMATCS301",
            "title": "Probability, Distributions and Statistics",
            "credits": 4,
            "type": "ASC",
            "modules": [
                {
                    "module_number": 1,
                    "title": "Module-1: Modular Arithmetic & Cryptography",
                    "hours": 8,
                    "topics": [
                        "Introduction to Modular Arithmetic and Applications in CSE",
                        "Congruences, Linear Congruences, Remainder Theorem, Linear Diophantine Equations",
                        "System of Linear Congruences",
                        "Euler's Theorem, Wilson's Theorem, Fermat's Little Theorem",
                        "Applications of Congruences: RSA Cryptographic Algorithm"
                    ]
                },
                {
                    "module_number": 2,
                    "title": "Module-2: Statistics & Curve Fitting",
                    "hours": 8,
                    "topics": [
                        "Principles of Least Squares & Curve Fitting (y=a+bx, y=a+bx+cx^2, y=ax^b)",
                        "Correlation, Coefficient of Correlation, Lines of Regression",
                        "Angle between Regression Lines, Rank Correlation"
                    ]
                },
                {
                    "module_number": 3,
                    "title": "Module-3: Probability Distributions",
                    "hours": 9,
                    "topics": [
                        "Review of Basic Probability Theory, Discrete & Continuous Random Variables",
                        "Probability Mass & Density Functions, Mathematical Expectation (Mean & Variance)",
                        "Binomial Distribution (Derivation of Mean & Variance)",
                        "Poisson Distribution (Derivation of Mean & Variance)",
                        "Normal Distribution and Applications"
                    ]
                },
                {
                    "module_number": 4,
                    "title": "Module-4: Joint Probability Distribution & Markov Chains",
                    "hours": 8,
                    "topics": [
                        "Joint Probability Distribution for Two Discrete Random Variables",
                        "Expectation, Covariance, and Correlation",
                        "Markov Chain: Introduction to Stochastic Processes, Probability Vectors, Stochastic Matrices",
                        "Regular Stochastic Matrices, Higher Transition Probabilities, Stationary Distribution of Regular Markov Chains"
                    ]
                },
                {
                    "module_number": 5,
                    "title": "Module-5: Statistical Inference & Testing Hypothesis",
                    "hours": 9,
                    "topics": [
                        "Sampling Distribution, Standard Error, Levels of Significance, Testing Hypothesis",
                        "Test of Significance for Large Samples (Mean, Proportion)",
                        "Test of Significance for Small Samples: Student's t-test",
                        "Chi-Square Test as a Goodness of Fit",
                        "Central Limit Theorem and Confidence Limits"
                    ]
                }
            ],
            "textbooks": [
                "Ronald E. Walpole, Raymond H Myers, Sharon L Myers & Keying Ye, 'Probability and Statistics for Engineers and Scientists', Pearson Education, 9th edition, 2012.",
                "Murray R. Spiegel, Larry J. Stephens, 'Statistics', Schaum's outline series, 6th edition.",
                "Koshy, Thomas, 'Elementary number theory with applications', Academic press, 2nd Edition, 2009."
            ],
            "reference_books": [
                "Erwin Kreyszig, 'Advanced Engineering Mathematics', John Wiley & Sons, 11th Edition, 2006.",
                "B. S. Grewal, 'Higher Engineering Mathematics', Khanna publishers, 45th Ed., 2021."
            ]
        },
        {
            "code": "1BCSL306",
            "title": "Data Structures Laboratory",
            "credits": 1,
            "type": "PCCL",
            "modules": [
                {
                    "module_number": 1,
                    "title": "Part A: Fixed Set of Experiments",
                    "hours": 14,
                    "topics": [
                        "Lab Exp 1: Library Book Record Management with Dynamic Memory Allocation in C",
                        "Lab Exp 2: Sparse Matrix Addition and Transpose Operations",
                        "Lab Exp 3: Stack Operations & Overflow/Underflow Demonstration",
                        "Lab Exp 4: Printer Queue Simulation using Array Queue",
                        "Lab Exp 5: Singly Circular Linked List (SCLL) Polynomial Addition",
                        "Lab Exp 6: Binary Tree Level-Order Creation & Preorder/Inorder/Postorder Traversals"
                    ]
                },
                {
                    "module_number": 2,
                    "title": "Part B: Open-Ended Engineering Experiments",
                    "hours": 14,
                    "topics": [
                        "Open-Ended 1: Compiler Infix-to-Postfix Converter with Bracket Nesting Validation",
                        "Open-Ended 2: Student Records Management using Doubly/Circular Linked List",
                        "Open-Ended 3: Manufacturing Inventory System for Assembly Machine Parts",
                        "Open-Ended 4: Hierarchical Key-Based Information Search & Insertion",
                        "Open-Ended 5: Employee Record Management using Indexing Mechanisms",
                        "Open-Ended 6: City Transportation Network Graph Reachability Analysis"
                    ]
                }
            ],
            "textbooks": [
                "Ellis Horowitz, Sartaj Sahni and Susan Anderson-Freed, 'Fundamentals of Data Structures in C', 2nd Ed, Universities Press, 2023."
            ],
            "reference_books": [
                "A M Tenenbaum, 'Data Structures using C', PHI, 1989."
            ]
        },
        {
            "code": "1BCSL307A",
            "title": "Project Management (with Git)",
            "credits": 1,
            "type": "AEC",
            "modules": [
                {
                    "module_number": 1,
                    "title": "Git Essentials & Branching Workflows",
                    "hours": 14,
                    "topics": [
                        "Git Setup, Staging Area, Committing with Conventional Messages",
                        "Branching Strategies: Feature Branch Creation, Switch, Merge to Master",
                        "Stashing Changes and Re-applying Stashed Working Directory",
                        "Remote Repositories: Clone, Fetch, and Rebase Local Branch",
                        "Merge Commit Customization, Git Tagging (v1.0), Cherry-Picking Commit Ranges",
                        "Git History Analysis: Commit Inspection, Author/Date Filtering, Undoing Commits (git revert)"
                    ]
                }
            ],
            "textbooks": [
                "Prem Kumar Ponuthorai, Jon Loeliger, 'Version Control with Git', 3rd Edition, O'Reilly Media, 2022.",
                "Scott Chacon, Ben Straub, 'Pro Git', Apress."
            ],
            "reference_books": [
                "Richard E. Silverman, 'Git Pocket Guide', O'Reilly Media."
            ]
        },
        {
            "code": "1BCP308",
            "title": "Community Project / Societal Project",
            "credits": 1,
            "type": "SDC",
            "modules": [
                {
                    "module_number": 1,
                    "title": "Project-Based Societal Engineering Solutions",
                    "hours": 30,
                    "topics": [
                        "Field Problem Identification & Stakeholder Survey",
                        "Sustainable Technological Intervention Design (SDGs alignment)",
                        "Engineering Implementation, DPR / App Prototype Development",
                        "Community Testing, Field Demonstration & Project Documentation"
                    ]
                }
            ],
            "textbooks": [
                "N. D. Phadke, 'Community Engagement and Social Innovation', Oxford University Press."
            ],
            "reference_books": [
                "N. R. Garg, 'Project-Based Learning in Engineering Education', Pearson India."
            ]
        }
    ]
}

NCERT_GRADE7_SCIENCE_SYLLABUS = {
    "university": "NCERT / CBSE",
    "scheme": "2026 Revised",
    "branch": "General Science",
    "semester": "Grade 7",
    "subjects": [
        {
            "code": "NCERT-SCI-7",
            "title": "Science / Biology",
            "credits": 0,
            "type": "School",
            "modules": [
                {
                    "module_number": 1,
                    "title": "Chapter 1: Nutrition in Plants",
                    "hours": 10,
                    "topics": [
                        "Autotrophic Mode of Nutrition",
                        "Photosynthesis: Food Making Process in Plants",
                        "Chlorophyll & Sunlight Absorption",
                        "Stomata Guard Cells Gas Exchange",
                        "Iodine Test for Starch in Leaves"
                    ]
                },
                {
                    "module_number": 2,
                    "title": "Chapter 2: Nutrition in Animals",
                    "hours": 10,
                    "topics": [
                        "Human Digestive System",
                        "Digestion in Grass-Eating Animals (Ruminants)",
                        "Feeding & Digestion in Amoeba"
                    ]
                }
            ],
            "textbooks": ["NCERT Class 7 Science Revised Edition 2026"],
            "reference_books": ["CBSE Class 7 Science Handbook"]
        }
    ]
}
