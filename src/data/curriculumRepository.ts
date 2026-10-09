import { CourseContext, CurriculumTopic } from '../types';

export interface CurriculumSubjectData {
  code: string;
  title: string;
  credits: number;
  type: string;
  modules: Array<{
    module_number: number;
    title: string;
    hours?: number;
    topics: string[];
  }>;
  textbooks: string[];
  reference_books: string[];
}

export interface UniversityCurriculumData {
  university: string;
  scheme: string;
  branch: string;
  semester: string;
  subjects: CurriculumSubjectData[];
}

export const VTU_2025_SEM3_CSE: UniversityCurriculumData = {
  university: "Visvesvaraya Technological University (VTU)",
  scheme: "2025 Scheme",
  branch: "Computer Science and Engineering",
  semester: "3rd Semester",
  subjects: [
    {
      code: "1BCS305",
      title: "Data Structures and Applications",
      credits: 3,
      type: "PCC",
      modules: [
        {
          module_number: 1,
          title: "Module 1: Pointers, Arrays & Sparse Matrices",
          hours: 8,
          topics: [
            "Data Structures Classifications (Primitive & Non-Primitive)",
            "Pointers and Dynamic Memory Allocation",
            "Arrays and Dynamically Allocated Arrays",
            "Structures and Unions, Polynomials",
            "Sparse Matrices: Representation and Transposing a Matrix"
          ]
        },
        {
          module_number: 2,
          title: "Module 2: Stacks, Queues & Applications",
          hours: 8,
          topics: [
            "Stacks: Definition, Operations, Array Representation",
            "Stacks using Dynamic Arrays",
            "Stack Applications: Polish Notation, Infix to Postfix Conversion",
            "Evaluation of Postfix Expression",
            "Queues: Definition, Array Representation, Queue Operations"
          ]
        },
        {
          module_number: 3,
          title: "Module 3: Linked Lists & Circular Queues",
          hours: 9,
          topics: [
            "Circular Queues & Circular Queues using Dynamic Arrays",
            "Multiple Stacks and Queues",
            "Singly Linked Lists and Chains, Representing Chains in C",
            "Linked Stacks and Queues, Additional List Operations",
            "Doubly Linked Lists & Sparse Matrix Representation via Linked Lists"
          ]
        },
        {
          module_number: 4,
          title: "Module 4: Trees & Binary Search Trees",
          hours: 9,
          topics: [
            "Trees: Introduction, Terminology, Binary Trees & Properties",
            "Array and Linked Representation of Binary Trees",
            "Binary Tree Traversals (Preorder, Inorder, Postorder)",
            "Threaded Binary Trees",
            "Binary Search Trees: Definition, Searching, Insertion, Deletion"
          ]
        },
        {
          module_number: 5,
          title: "Module 5: Graphs, Hashing & Priority Queues",
          hours: 8,
          topics: [
            "Graphs: Graph Abstract Data Type, Elementary Graph Operations (BFS, DFS)",
            "Static Hashing and Dynamic Hashing",
            "Priority Queues: Single and Double Ended Priority Queues",
            "Leftist Trees"
          ]
        }
      ],
      textbooks: [
        "Ellis Horowitz, Sartaj Sahni, and Susan Anderson-Freed, 'Fundamentals of Data Structures in C', 2nd Ed, Universities Press, 2023."
      ],
      reference_books: [
        "Seymour Lipschutz, 'Data Structures Schaum's Outlines', McGraw-Hill, 2014.",
        "Aaron M Tenenbaum, 'Data Structures using C', Pearson Education, 2019."
      ]
    },
    {
      code: "1BCS304",
      title: "Operating Systems",
      credits: 3,
      type: "PCC",
      modules: [
        {
          module_number: 1,
          title: "Module 1: OS Architecture & System Calls",
          hours: 9,
          topics: [
            "Computer System Organization & Architecture",
            "Operating System Structure & Operations",
            "System Calls & Types of System Calls",
            "System Programs & OS Design and Implementation"
          ]
        },
        {
          module_number: 2,
          title: "Module 2: Process Management & CPU Scheduling",
          hours: 8,
          topics: [
            "Process Concept, Process Scheduling, IPC",
            "Multi-threaded Programming & Models",
            "CPU Scheduling Criteria & Algorithms (FCFS, SJF, Round Robin, Priority)",
            "Thread Scheduling & Multi-Processor Scheduling"
          ]
        },
        {
          module_number: 3,
          title: "Module 3: Process Synchronization & Deadlocks",
          hours: 9,
          topics: [
            "Critical Section Problem & Peterson's Solution",
            "Semaphores & Classic Synchronization Problems",
            "Deadlock Characterization (Coffman Conditions)",
            "Deadlock Avoidance: Banker's Algorithm",
            "Deadlock Detection & Recovery"
          ]
        },
        {
          module_number: 4,
          title: "Module 4: Memory Management & Virtual Memory",
          hours: 8,
          topics: [
            "Memory Allocation (First Fit, Best Fit, Worst Fit)",
            "Paging & Structure of Page Table",
            "Demand Paging & Copy-on-Write",
            "Page Replacement Algorithms (FIFO, LRU, Optimal)",
            "Allocation of Frames & Thrashing"
          ]
        },
        {
          module_number: 5,
          title: "Module 5: File Systems & Mass Storage",
          hours: 8,
          topics: [
            "File Concept & Directory Structure",
            "File Allocation Methods & Free Space Management",
            "Disk Structure & Scheduling (SCAN, LOOK, SSTF)",
            "Swap Space Management"
          ]
        }
      ],
      textbooks: [
        "Silberschatz, Galvin, Gagne, 'Operating System Principles', 9th edition, Wiley."
      ],
      reference_books: [
        "William Stallings, 'Operating Systems', 7th Edition, Pearson."
      ]
    },
    {
      code: "1BCS302",
      title: "Object Oriented Programming with Java",
      credits: 4,
      type: "IPCC",
      modules: [
        {
          module_number: 1,
          title: "Module 1: Java Basics & Control Flow",
          hours: 9,
          topics: [
            "OOP Principles, Java Lexical Issues",
            "Data Types, Variables, Type Conversion & Arrays",
            "Operators & Control Statements (if, switch, loops)",
            "Jump Statements (break, continue, return)"
          ]
        },
        {
          module_number: 2,
          title: "Module 2: Classes, Objects & Methods",
          hours: 8,
          topics: [
            "Class Fundamentals, Objects, Constructors, 'this'",
            "Method Overloading, Argument Passing, Returning Objects",
            "Recursion, Access Control, static, final",
            "Nested and Inner Classes"
          ]
        },
        {
          module_number: 3,
          title: "Module 3: Inheritance, Packages & Interfaces",
          hours: 9,
          topics: [
            "Inheritance Basics, super, Multilevel Hierarchy",
            "Method Overriding, Dynamic Method Dispatch, Abstract Classes",
            "Packages Creation & Importing",
            "Interfaces: Default, Static, & Private Methods"
          ]
        },
        {
          module_number: 4,
          title: "Module 4: Exceptions & Multithreading",
          hours: 8,
          topics: [
            "Exception Handling (try-catch, throw, throws, finally)",
            "Custom Exception Subclasses",
            "Java Thread Model, Thread Creation & Priorities",
            "isAlive(), join(), & Synchronization"
          ]
        },
        {
          module_number: 5,
          title: "Module 5: Enumerations, Autoboxing & Generics",
          hours: 8,
          topics: [
            "Enumerations, values() & valueOf()",
            "Autoboxing & Unboxing in Expressions",
            "Generics: Generic Classes & Two Parameters",
            "Bounded Types & Wildcards"
          ]
        }
      ],
      textbooks: [
        "Herbert Schildt, 'Java: The Complete Reference', 13th Edition, McGraw-Hill, 2024."
      ],
      reference_books: [
        "Cay S. Horstmann, 'Core Java Volume I', 14th Edition, 2026."
      ]
    },
    {
      code: "1BCS303",
      title: "Digital Design and Computer Organization",
      credits: 4,
      type: "PCC",
      modules: [
        {
          module_number: 1,
          title: "Module 1: Boolean Algebra & Gate Minimization",
          hours: 12,
          topics: [
            "Boolean Algebra Theorems & Logic Gates",
            "4-Variable K-Map Minimization",
            "Product of Sums & Don't Care Conditions",
            "NAND/NOR Implementation"
          ]
        },
        {
          module_number: 2,
          title: "Module 2: Combinational & Sequential Circuits",
          hours: 12,
          topics: [
            "Binary Adder-Subtractor, Decoders, Encoders, Multiplexers",
            "Synchronous Sequential Logic: Latches & Flip-Flops (SR, JK, D, T)"
          ]
        },
        {
          module_number: 3,
          title: "Module 3: Computer Structure & Instructions",
          hours: 10,
          topics: [
            "Functional Units, Bus Structure, Performance",
            "CISC vs RISC Instruction Set Architectures",
            "Memory Locations, Addressing Modes & Sequencing"
          ]
        },
        {
          module_number: 4,
          title: "Module 4: I/O Organization & Memory Hierarchy",
          hours: 12,
          topics: [
            "Accessing I/O, Interrupt Hardware, DMA",
            "Semiconductor RAM, ROM, Cache Memory Mapping"
          ]
        },
        {
          module_number: 5,
          title: "Module 5: Processing Unit & Pipelining",
          hours: 10,
          topics: [
            "Hardwired Control Unit & Multiple Bus",
            "Pipelining Concepts, Cache Role & Pipeline Performance"
          ]
        }
      ],
      textbooks: [
        "M. Morris Mano, 'Digital Design', 6th Ed, Pearson.",
        "Carl Hamacher, 'Computer Organization', 5th Ed, McGraw Hill."
      ],
      reference_books: [
        "William Stallings, 'Computer Organization & Architecture', 11th Ed."
      ]
    },
    {
      code: "1BMATCS301",
      title: "Probability, Distributions and Statistics",
      credits: 4,
      type: "ASC",
      modules: [
        {
          module_number: 1,
          title: "Module 1: Modular Arithmetic & RSA",
          hours: 8,
          topics: [
            "Congruences, Linear Congruences, Remainder Theorem",
            "Linear Diophantine Equations & System of Congruences",
            "Euler's, Wilson's & Fermat's Little Theorem",
            "RSA Cryptographic Algorithm Applications"
          ]
        },
        {
          module_number: 2,
          title: "Module 2: Statistics & Curve Fitting",
          hours: 8,
          topics: [
            "Least Squares Curve Fitting (y=a+bx, y=a+bx+cx^2, y=ax^b)",
            "Correlation & Lines of Regression",
            "Angle Between Regression Lines & Rank Correlation"
          ]
        },
        {
          module_number: 3,
          title: "Module 3: Probability Distributions",
          hours: 9,
          topics: [
            "Discrete & Continuous Random Variables, Expectation & Variance",
            "Binomial, Poisson & Normal Distributions"
          ]
        },
        {
          module_number: 4,
          title: "Module 4: Joint Distributions & Markov Chains",
          hours: 8,
          topics: [
            "Joint Distributions, Covariance & Correlation",
            "Markov Chains: Transition Probabilities & Stationary Distributions"
          ]
        },
        {
          module_number: 5,
          title: "Module 5: Statistical Inference & Testing",
          hours: 9,
          topics: [
            "Sampling Distribution, Standard Error & Testing Hypothesis",
            "Student's t-test, Chi-Square Test & Central Limit Theorem"
          ]
        }
      ],
      textbooks: [
        "Ronald E. Walpole, 'Probability and Statistics for Engineers', 9th Ed.",
        "Thomas Koshy, 'Elementary Number Theory with Applications', 2nd Ed."
      ],
      reference_books: [
        "Erwin Kreyszig, 'Advanced Engineering Mathematics', 11th Ed."
      ]
    },
    {
      code: "1BCSL306",
      title: "Data Structures Laboratory",
      credits: 1,
      type: "PCCL",
      modules: [
        {
          module_number: 1,
          title: "Part A: Fixed Laboratory Experiments",
          hours: 14,
          topics: [
            "Library Book Record Management with Dynamic Memory Allocation in C",
            "Sparse Matrix Addition and Transpose Operations",
            "Stack Operations & Overflow/Underflow Demonstration",
            "Printer Queue Simulation using Array Queue",
            "Singly Circular Linked List (SCLL) Polynomial Addition",
            "Binary Tree Level-Order Creation & Traversals"
          ]
        },
        {
          module_number: 2,
          title: "Part B: Open-Ended Engineering Projects",
          hours: 14,
          topics: [
            "Compiler Infix-to-Postfix Converter with Syntax Validation",
            "Student Records Management using Doubly/Circular Linked List",
            "Machine Parts Inventory Repository System",
            "City Transportation Network Graph Reachability Analysis"
          ]
        }
      ],
      textbooks: ["Horowitz & Sahni, 'Fundamentals of Data Structures in C'"],
      reference_books: ["Tenenbaum, 'Data Structures using C'"]
    },
    {
      code: "1BCSL307A",
      title: "Project Management (with Git)",
      credits: 1,
      type: "AEC",
      modules: [
        {
          module_number: 1,
          title: "Git Repository & Branching Workflows",
          hours: 14,
          topics: [
            "Git Init, Staging Area & Commits",
            "Branch Management (Create, Switch, Merge, Stash)",
            "Remote Repositories (Clone, Fetch, Rebase)",
            "Git Tags, Releases & Cherry-Picking Commits",
            "Commit History Analysis & Undoing Commits (git revert)"
          ]
        }
      ],
      textbooks: ["Prem Kumar Ponuthorai, 'Version Control with Git', 3rd Ed."],
      reference_books: ["Scott Chacon, 'Pro Git'"]
    },
    {
      code: "1BCP308",
      title: "Community Project / Societal Project",
      credits: 1,
      type: "SDC",
      modules: [
        {
          module_number: 1,
          title: "Project-Based Learning & Societal Solutions",
          hours: 30,
          topics: [
            "Field Interaction & Stakeholder Need Identification",
            "Sustainable Technical Solution Design (SDG alignment)",
            "Prototype Development & Community Demonstration"
          ]
        }
      ],
      textbooks: ["N. D. Phadke, 'Community Engagement & Social Innovation'"],
      reference_books: ["N. R. Garg, 'Project-Based Learning in Engineering'"]
    }
  ]
};

export const NCERT_GRADE7_SCIENCE: UniversityCurriculumData = {
  university: "NCERT / CBSE",
  scheme: "2026 Revised",
  branch: "General Science",
  semester: "Grade 7",
  subjects: [
    {
      code: "NCERT-SCI-7",
      title: "Science / Biology",
      credits: 0,
      type: "School",
      modules: [
        {
          module_number: 1,
          title: "Chapter 1: Nutrition in Plants",
          hours: 10,
          topics: [
            "Autotrophic Mode of Nutrition",
            "Photosynthesis: Food Making Process in Plants",
            "Chlorophyll & Sunlight Absorption",
            "Stomata Guard Cells Gas Exchange",
            "Iodine Test for Starch in Leaves"
          ]
        },
        {
          module_number: 2,
          title: "Chapter 2: Nutrition in Animals",
          hours: 10,
          topics: [
            "Human Digestive System",
            "Digestion in Grass-Eating Animals (Ruminants)",
            "Feeding & Digestion in Amoeba"
          ]
        }
      ],
      textbooks: ["NCERT Class 7 Science Revised Edition 2026"],
      reference_books: ["CBSE Class 7 Science Handbook"]
    }
  ]
};

/**
 * Converts a CurriculumSubjectData into CurriculumTopic array for UI consumption
 */
export function convertSubjectToCurriculumTopics(subject: CurriculumSubjectData): CurriculumTopic[] {
  const topics: CurriculumTopic[] = [];

  subject.modules.forEach((mod, modIdx) => {
    mod.topics.forEach((topTitle, topIdx) => {
      const isFirst = modIdx === 0 && topIdx === 0;
      topics.push({
        id: `${subject.code.toLowerCase()}-m${mod.module_number}-t${topIdx + 1}`,
        module: mod.title,
        title: topTitle,
        description: `Official ${subject.code} ${mod.title} curriculum topic covering ${topTitle.toLowerCase()}.`,
        prerequisites: topIdx > 0 ? [mod.topics[topIdx - 1]] : (modIdx > 0 ? [subject.modules[modIdx - 1].topics[0]] : ["Foundational Concepts"]),
        isUnlocked: isFirst || topIdx < 3 || modIdx < 2,
        masteryScore: isFirst ? 85 : Math.floor(Math.random() * 45 + 40),
        diagramNotes: [
          {
            title: `${topTitle} Reference Diagram`,
            note: `Key engineering concept visual representation for ${topTitle}.`,
            imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80"
          }
        ],
        videoLinks: [
          {
            title: `NPTEL Lecture: ${topTitle}`,
            url: "https://nptel.ac.in/courses/106105191/",
            duration: "20 min"
          }
        ]
      });
    });
  });

  return topics;
}

export function getCurriculumData(
  university: string,
  scheme: string,
  branch: string,
  semester: string,
  subjectCode: string
): { available: boolean; subject?: CurriculumSubjectData; topics?: CurriculumTopic[] } {
  const uniNorm = university.toLowerCase();
  const isVtu = uniNorm.includes("vtu") || uniNorm.includes("visvesvaraya");

  if (isVtu && semester.includes("3") && branch.includes("Computer Science")) {
    const foundSubject = VTU_2025_SEM3_CSE.subjects.find(
      s => s.code.toLowerCase() === subjectCode.toLowerCase() || s.title.toLowerCase().includes(subjectCode.toLowerCase())
    );
    if (foundSubject) {
      return {
        available: true,
        subject: foundSubject,
        topics: convertSubjectToCurriculumTopics(foundSubject)
      };
    }
  }

  if (uniNorm.includes("ncert") || uniNorm.includes("cbse")) {
    const foundSubject = NCERT_GRADE7_SCIENCE.subjects[0];
    return {
      available: true,
      subject: foundSubject,
      topics: convertSubjectToCurriculumTopics(foundSubject)
    };
  }

  return { available: false };
}
