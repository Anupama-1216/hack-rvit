import { Student, DocumentSource, LessonPlan, AdaptiveRoute, TeacherCopilotRecommendation, CourseContext, CalendarEvent, StudentAssessmentRecord } from '../types';

export function getLessonPlanForContext(context?: CourseContext): LessonPlan {
  const univ = context?.university || '';
  const subj = context?.subjectCode || context?.subjectTitle || '';
  if (
    univ.includes('VTU') ||
    univ.includes('Visvesvaraya') ||
    subj.includes('1BCS') ||
    subj.includes('1BMAT') ||
    subj.includes('1BCP') ||
    subj.includes('Data Structures')
  ) {
    return DEFAULT_VTU_DSA_LESSON_40MIN;
  }
  if (subj.includes('CN') || subj.includes('Computer Networks') || subj.includes('1BCS304')) {
    return DEFAULT_CN_LESSON_30MIN;
  }
  return DEFAULT_PHOTOSYNTHESIS_LESSON_40MIN;
}

export const VTU_DOCUMENTS: DocumentSource[] = [
  {
    id: 'doc-vtu-2025-syllabus',
    title: 'VTU Scheme 2025 3rd Semester CSE - 1BCS305 Data Structures Specification',
    filename: 'VTU_2025_Sem3_CSE_1BCS305_Syllabus.pdf',
    type: 'curriculum_guide',
    uploadDate: '2026-09-01',
    versionYear: 2025,
    trustScore: 99,
    fileSize: '3.4 MB',
    status: 'active',
    relevantPages: 'Module 1–5 Syllabus Specification (Pages 1–14)',
    summary: 'Official VTU Scheme 2025 prescribed curriculum for Data Structures and Applications (1BCS305). Covers Pointers, Dynamic Allocation, Singly/Doubly Linked Lists, Stacks, Queues, Trees, and Graphs.',
    extractedSnippet: 'Module 3: Singly Linked Lists: Dynamic memory allocation using malloc() and free(). Node insertion, deletion, and searching operations in O(1) and O(N) time. Applications of linked lists in polynomial representation.',
    citationKey: 'VTU 2025 Scheme, 1BCS305 Syllabus',
    pdfPages: [
      {
        pageNumber: 1,
        title: 'Module 3: Linked Lists & Dynamic Memory Allocation',
        content: 'Prescribed textbook: Horowitz & Sahni, Fundamentals of Data Structures in C. Topics: Nodes, memory addresses, malloc(), free(), head pointers, singly linked list traversal, insert_at_head(), insert_at_tail(), delete_node().',
        keyPoints: [
          'Dynamic Memory: malloc(sizeof(struct Node)) heap allocation.',
          'Singly Linked List: O(1) insertion at head via pointer reassignment.',
          'Memory Leak Prevention: Explicit free(temp) required in C.'
        ]
      }
    ]
  },
  {
    id: 'doc-horowitz-ds',
    title: 'Fundamentals of Data Structures in C (Horowitz & Sahni, 2nd Edition)',
    filename: 'Horowitz_Sahni_Data_Structures_in_C_2ndEd.pdf',
    type: 'textbook',
    uploadDate: '2026-08-20',
    versionYear: 2024,
    trustScore: 98,
    fileSize: '12.8 MB',
    status: 'active',
    relevantPages: 'Chapter 4: Linked Lists (Pages 145–182)',
    summary: 'Standard VTU prescribed textbook for Data Structures. Detailed code implementations in C for singly linked lists, circular lists, doubly linked lists, and sparse matrix representations.',
    extractedSnippet: 'Chapter 4.2: Singly Linked Lists: A singly linked list is a linear sequence of node structures where each node contains a data element and a pointer (*next) to the next node in memory.',
    citationKey: 'Horowitz & Sahni 2nd Ed, Ch 4',
    pdfPages: [
      {
        pageNumber: 145,
        title: 'Chapter 4: Linked List Node Layout & Pointers',
        content: 'In C, a node is defined as: struct Node { int data; struct Node* next; }; Pointer reassignment for insertion: temp = (Node*)malloc(sizeof(Node)); temp->data = val; temp->next = head; head = temp;',
        keyPoints: [
          'Node Structure: Data field + Next pointer address.',
          'Heap Allocation: malloc() returns pointer to allocated memory block.',
          'Traversal: Loop while temp != NULL.'
        ]
      }
    ]
  },
  {
    id: 'doc-vtu-notes-2021',
    title: 'Legacy CSE Notes - 2021 Non-VTU Scheme (Superseded)',
    filename: 'Legacy_DataStructures_Notes_2021.pdf',
    type: 'notes',
    uploadDate: '2026-07-15',
    versionYear: 2021,
    trustScore: 44,
    fileSize: '1.8 MB',
    status: 'outdated_ignored',
    relevantPages: 'Pages 5–8',
    summary: 'Outdated handwritten notes from 2021 non-VTU scheme with missing 2025 C structure standards and deprecated array-based stack allocation.',
    extractedSnippet: 'Legacy Note: "Use static global arrays for linked list node pools." Flagged by trust engine due to deviation from 2025 VTU dynamic heap malloc() requirements.',
    conflictReason: 'Syllabus conflict: VTU Scheme 2025 mandates dynamic heap allocation via malloc() and pointer structures.',
    citationKey: 'Legacy 2021 Notes (Ignored)',
    pdfPages: [
      {
        pageNumber: 1,
        title: 'Legacy Notes - Static Array Node Pool',
        content: 'Static node allocation in global arrays. Status: Flagged as Outdated by Epistemic Trust Engine.',
        keyPoints: [
          'Static Array Pool: Superseded by 2025 VTU malloc() heap allocation.',
          'Status: Ignored due to curriculum conflict.'
        ]
      }
    ]
  }
];

export const VTU_STUDENTS: Student[] = [
  {
    id: 'std-0',
    name: 'Rahul Sharma',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    grade: 3,
    learningPace: 'slow',
    preferredLanguage: 'Bilingual',
    recentScores: [
      { quizName: 'C Pointers & Memory Allocation', score: 9, maxScore: 10, date: '2026-10-01' },
      { quizName: 'Singly Linked List Traversals', score: 7, maxScore: 10, date: '2026-10-04' },
      { quizName: 'Node Insertion & malloc()', score: 4, maxScore: 10, date: '2026-10-07' }
    ],
    weakConcepts: ['Node Insertion (*next reassignment)', 'Heap Memory Allocation via malloc()', 'Freeing Memory (free())'],
    masteredConcepts: ['C Structure Syntax (struct Node)', 'Pointer Address Operators (& and *)'],
    riskScore: 82,
    riskReason: 'Struggles with memory pointer reassignment during Node insertion at middle positions; confuses static array indices with dynamic heap memory addresses.',
    recommendedScaffolding: 'Use the "RAM Heap Memory Address Map" visual diagram with step-by-step C pointer assignment worksheets.',
    learningTwin: {
      studentName: 'Rahul Sharma',
      subjectDomain: 'VTU 1BCS305: Data Structures and Applications',
      conceptBreakdown: [
        { conceptName: 'C Structure Basics', masteryPercentage: 91, trend: 'improving', category: 'Foundational', status: 'mastered' },
        { conceptName: 'Pointer Addresses (& and *)', masteryPercentage: 72, trend: 'stable', category: 'Intermediate', status: 'moderate' },
        { conceptName: 'Node Insertion (*next)', masteryPercentage: 48, trend: 'declining', category: 'Bottleneck', status: 'struggling' },
        { conceptName: 'Dynamic Heap malloc()', masteryPercentage: 55, trend: 'declining', category: 'Downstream', status: 'struggling' }
      ],
      cognitiveTraits: {
        strongAt: ['Visual memory map diagrams & code step execution', 'Structure definition syntax'],
        weakAt: ['Multi-pointer reassignment logic under time limits', 'Freeing heap memory without leaks'],
        modalityPreference: 'Prefers voice explanations in Hindi/English + interactive memory pointer visualizers',
        learningPace: 'slow'
      },
      predictedDifficulty: {
        targetConcept: 'Singly Linked List Mid-Node Insertion & Pointer Reassignment',
        riskPercentage: 82,
        recommendedIntervention: 'Provide bilingual "RAM Heap Memory Address Map" scaffold with C code step execution.'
      },
      learningTrajectory: [
        { timestamp: '2026-10-01', concept: 'C Struct Basics', deltaScore: 91, action: 'Quiz 1 Mastered' },
        { timestamp: '2026-10-04', concept: 'Pointer Addresses', deltaScore: 72, action: 'Worksheet Passed' },
        { timestamp: '2026-10-07', concept: 'Node Insertion', deltaScore: 48, action: 'Intervention Required' }
      ]
    }
  },
  {
    id: 'std-1',
    name: 'Aarav Sharma',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    grade: 3,
    learningPace: 'slow',
    preferredLanguage: 'Hindi',
    recentScores: [
      { quizName: 'Data Structures C Basics', score: 4, maxScore: 10, date: '2026-09-28' },
      { quizName: 'Singly Linked List Traversals', score: 5, maxScore: 10, date: '2026-10-02' }
    ],
    weakConcepts: ['malloc() Heap Allocation', 'Pointer Dereferencing'],
    masteredConcepts: ['Arrays vs Linked Lists definition'],
    riskScore: 86,
    riskReason: 'Struggles with dynamic memory allocation syntax in C; requires step-by-step memory address diagrams.',
    recommendedScaffolding: 'Provide bilingual Hindi-English memory layout diagrams and guided code execution.',
    learningTwin: {
      studentName: 'Aarav Sharma',
      subjectDomain: 'VTU 1BCS305: Data Structures and Applications',
      conceptBreakdown: [
        { conceptName: 'Arrays vs Linked Lists', masteryPercentage: 88, trend: 'stable', category: 'Foundational', status: 'mastered' },
        { conceptName: 'Head Pointer Concept', masteryPercentage: 65, trend: 'stable', category: 'Intermediate', status: 'moderate' },
        { conceptName: 'malloc() Allocation', masteryPercentage: 42, trend: 'declining', category: 'Bottleneck', status: 'struggling' },
        { conceptName: 'Pointer Dereferencing', masteryPercentage: 45, trend: 'declining', category: 'Downstream', status: 'struggling' }
      ],
      cognitiveTraits: {
        strongAt: ['Visual memory block diagrams', 'Concept definition recall'],
        weakAt: ['C syntax pointers (* and ->)', 'Memory allocation error handling'],
        modalityPreference: 'Prefers Hindi audio + step-by-step visual pointer reassignments',
        learningPace: 'slow'
      },
      predictedDifficulty: {
        targetConcept: 'Dynamic Memory Heap Allocation (malloc)',
        riskPercentage: 86,
        recommendedIntervention: 'Provide step-by-step C pointer memory assignment worksheets.'
      },
      learningTrajectory: [
        { timestamp: '2026-09-28', concept: 'Arrays vs Linked Lists', deltaScore: 40, action: 'Quiz 1' },
        { timestamp: '2026-10-02', concept: 'Singly Linked List', deltaScore: 50, action: 'Remedial Review' }
      ]
    }
  },
  {
    id: 'std-2',
    name: 'Priya Patel',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    grade: 3,
    learningPace: 'standard',
    preferredLanguage: 'English',
    recentScores: [
      { quizName: 'Data Structures C Basics', score: 7, maxScore: 10, date: '2026-09-28' },
      { quizName: 'Singly Linked List Traversals', score: 6, maxScore: 10, date: '2026-10-02' }
    ],
    weakConcepts: ['NULL Pointer Safety Check'],
    masteredConcepts: ['Node Insertion at Head', 'Head Pointer Basics'],
    riskScore: 78,
    riskReason: 'Omits NULL pointer verification before traversing temp->next, risking segmentation fault runtime crashes.',
    recommendedScaffolding: 'Use defensive C coding worksheets emphasizing while(temp != NULL) guard checks.',
    learningTwin: {
      studentName: 'Priya Patel',
      subjectDomain: 'VTU 1BCS305: Data Structures and Applications',
      conceptBreakdown: [
        { conceptName: 'Head Node Insertion', masteryPercentage: 90, trend: 'improving', category: 'Foundational', status: 'mastered' },
        { conceptName: 'Singly Linked List', masteryPercentage: 78, trend: 'stable', category: 'Core', status: 'moderate' },
        { conceptName: 'NULL Guard Checks', masteryPercentage: 52, trend: 'declining', category: 'Bottleneck', status: 'struggling' }
      ],
      cognitiveTraits: {
        strongAt: ['Algorithm flowcharts', 'Standard C code writing'],
        weakAt: ['Edge cases (empty list, single node list)'],
        modalityPreference: 'Flowchart diagrams + interactive C compiler simulator',
        learningPace: 'standard'
      },
      predictedDifficulty: {
        targetConcept: 'Null Pointer Dereference & Edge Cases',
        riskPercentage: 78,
        recommendedIntervention: 'Provide defensive programming checklists.'
      },
      learningTrajectory: [
        { timestamp: '2026-09-28', concept: 'Node Creation', deltaScore: 70, action: 'Passed' },
        { timestamp: '2026-10-02', concept: 'List Traversal', deltaScore: 60, action: 'Passed' }
      ]
    }
  },
  {
    id: 'std-3',
    name: 'Rohan Verma',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    grade: 3,
    learningPace: 'slow',
    preferredLanguage: 'Hindi',
    recentScores: [
      { quizName: 'Data Structures C Basics', score: 4, maxScore: 10, date: '2026-09-28' },
      { quizName: 'Singly Linked List Traversals', score: 4, maxScore: 10, date: '2026-10-02' }
    ],
    weakConcepts: ['Node Deletion in C', 'Freeing Memory (free())'],
    masteredConcepts: ['Array vs Pointer definitions'],
    riskScore: 84,
    riskReason: 'Low code stamina; needs micro-step C code exercises for node deletion.',
    recommendedScaffolding: 'Break node deletion C program into 3 micro-steps with peer coding buddy.',
    learningTwin: {
      studentName: 'Rohan Verma',
      subjectDomain: 'VTU 1BCS305: Data Structures and Applications',
      conceptBreakdown: [
        { conceptName: 'Pointer Definitions', masteryPercentage: 88, trend: 'stable', category: 'Foundational', status: 'mastered' },
        { conceptName: 'Node Traversal', masteryPercentage: 62, trend: 'stable', category: 'Intermediate', status: 'moderate' },
        { conceptName: 'Node Deletion C Code', masteryPercentage: 42, trend: 'declining', category: 'Bottleneck', status: 'struggling' }
      ],
      cognitiveTraits: {
        strongAt: ['Pair programming with peer buddy'],
        weakAt: ['Debugging C memory leaks'],
        modalityPreference: 'Bite-sized 2-minute voice code checks',
        learningPace: 'slow'
      },
      predictedDifficulty: {
        targetConcept: 'Dynamic Node Deletion & free()',
        riskPercentage: 84,
        recommendedIntervention: 'Provide peer buddy C code practice.'
      },
      learningTrajectory: [
        { timestamp: '2026-09-28', concept: 'Pointer Basics', deltaScore: 40, action: 'Quiz 1' },
        { timestamp: '2026-10-02', concept: 'Traversal', deltaScore: 40, action: 'Review' }
      ]
    }
  },
  {
    id: 'std-5',
    name: 'Vihaan Reddy',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    grade: 3,
    learningPace: 'fast',
    preferredLanguage: 'English',
    recentScores: [
      { quizName: 'Data Structures C Basics', score: 10, maxScore: 10, date: '2026-09-28' },
      { quizName: 'Singly Linked List Traversals', score: 9, maxScore: 10, date: '2026-10-02' }
    ],
    weakConcepts: [],
    masteredConcepts: ['All Linked List Operations', 'Doubly Linked Lists', 'Sparse Matrix Transpose'],
    riskScore: 12,
    riskReason: 'High mastery; ready for advanced data structures (Doubly Linked Lists, Circular Queues, Sparse Matrix).',
    recommendedScaffolding: 'Assign Doubly Linked List C implementation and memory fragmentation analysis.',
    learningTwin: {
      studentName: 'Vihaan Reddy',
      subjectDomain: 'VTU 1BCS305: Data Structures and Applications',
      conceptBreakdown: [
        { conceptName: 'Linked List Architecture', masteryPercentage: 98, trend: 'improving', category: 'Advanced', status: 'mastered' },
        { conceptName: 'Dynamic Heap Memory', masteryPercentage: 96, trend: 'improving', category: 'Advanced', status: 'mastered' },
        { conceptName: 'Doubly Linked List', masteryPercentage: 92, trend: 'improving', category: 'Extension', status: 'mastered' }
      ],
      cognitiveTraits: {
        strongAt: ['Complex algorithm analysis & O(1) pointer tricks'],
        weakAt: ['Repetitive basic exercises'],
        modalityPreference: 'Open-ended C programming challenges',
        learningPace: 'fast'
      },
      predictedDifficulty: {
        targetConcept: 'Doubly Linked List & Polynomial Multiplication',
        riskPercentage: 12,
        recommendedIntervention: 'Assign Doubly Linked List challenge card.'
      },
      learningTrajectory: [
        { timestamp: '2026-09-28', concept: 'Singly Linked List', deltaScore: 100, action: 'Exceeded' },
        { timestamp: '2026-10-02', concept: 'Polynomial Addition', deltaScore: 90, action: 'Exceeded' }
      ]
    }
  }
];

export function getDocumentsForContext(context?: CourseContext): DocumentSource[] {
  const univ = context?.university || '';
  const subj = context?.subjectCode || context?.subjectTitle || '';
  if (univ.includes('VTU') || univ.includes('Visvesvaraya') || subj.includes('1BCS') || subj.includes('1BMAT') || subj.includes('1BCP') || subj.includes('Data Structures')) {
    return VTU_DOCUMENTS;
  }
  return INITIAL_DOCUMENTS;
}

export function getStudentsForContext(context?: CourseContext): Student[] {
  const univ = context?.university || '';
  const subj = context?.subjectCode || context?.subjectTitle || '';
  if (univ.includes('VTU') || univ.includes('Visvesvaraya') || subj.includes('1BCS') || subj.includes('1BMAT') || subj.includes('1BCP') || subj.includes('Data Structures')) {
    return VTU_STUDENTS;
  }
  return INITIAL_STUDENTS;
}

export const VTU_CALENDAR_EVENTS: CalendarEvent[] = [
  {
    id: 'evt-vtu-1',
    title: '1BCS305: Singly Linked Lists & Dynamic Memory Allocation',
    topicId: 'ds-mod1-top2',
    module: 'VTU 2025 Scheme 3rd Sem CSE / 1BCS305',
    date: '2026-10-12',
    time: '10:00 AM - 10:45 AM',
    type: 'lesson',
    status: 'scheduled',
    objectives: [
      'Understand Singly Linked List structure and dynamic heap memory allocation via malloc()',
      'Demonstrate step-by-step O(1) Node Insertion at head, tail, and middle positions',
      'Write C code for create(), display(), and insert() functions as specified in VTU 1BCS305 syllabus'
    ],
    prerequisites: ['Pointers & Dynamic Memory Allocation', 'C Structure Syntax'],
    prerequisiteCompleted: true,
    resources: [
      {
        title: 'VTU 1BCS305 Pointer Memory Layout Notes',
        type: 'diagram',
        url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600',
        notes: 'RAM heap node memory layout showing Head pointer 0x1004 and malloc() allocations.'
      },
      {
        title: 'Horowitz & Sahni: Singly Linked List Implementation',
        type: 'notes',
        url: '#',
        notes: 'Read Chapter 4, Pages 145-182 for C structure definitions and pointer assignments.'
      }
    ]
  },
  {
    id: 'evt-vtu-2',
    title: 'Stack Applications: Infix to Postfix Expression Conversion',
    topicId: 'ds-mod1-top3',
    module: 'VTU 2025 Scheme 3rd Sem CSE / 1BCS305',
    date: '2026-10-14',
    time: '11:30 AM - 12:15 PM',
    type: 'lesson',
    status: 'scheduled',
    objectives: [
      'Stack LIFO operator precedence and associative push/pop operations',
      'Convert mathematical infix expressions to postfix format using stack memory'
    ],
    prerequisites: ['Singly Linked Lists', 'Arrays & Dynamic Contiguous Memory'],
    prerequisiteCompleted: true,
    resources: [
      {
        title: 'Stack Infix-to-Postfix Execution Diagram',
        type: 'diagram',
        url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600',
        notes: 'Operator stack push/pop precedence algorithm flowchart.'
      }
    ]
  },
  {
    id: 'evt-vtu-3',
    title: '🎯 Targeted Intervention: Aarav Sharma & Pointer Memory Allocation',
    topicId: 'ds-mod1-top2',
    module: 'VTU 2025 Scheme 3rd Sem CSE / 1BCS305',
    date: '2026-10-15',
    time: '02:00 PM - 02:30 PM',
    type: 'intervention',
    status: 'scheduled',
    assignedStudents: ['Aarav Sharma', 'Priya Patel', 'Rohan Verma'],
    objectives: [
      'Resolve C pointer dereferencing syntax mistakes (* and ->)',
      'Step-by-step malloc() heap memory allocation practice with visual address maps'
    ],
    prerequisites: ['Pointers & Dynamic Memory Allocation'],
    prerequisiteCompleted: true,
    resources: [
      {
        title: 'C Pointer Heap Allocation Worksheet',
        type: 'notes',
        url: '#',
        notes: 'Guided step-by-step memory pointer reassignment exercises.'
      }
    ],
    replanNotes: 'Intervention scheduled from Learner Risk Analytics.'
  },
  {
    id: 'evt-vtu-4',
    title: 'Binary Search Trees (BST) & Traversal Algorithms',
    topicId: 'ds-mod2-top1',
    module: 'VTU 2025 Scheme 3rd Sem CSE / 1BCS305',
    date: '2026-10-19',
    time: '09:00 AM - 10:00 AM',
    type: 'lesson',
    status: 'scheduled',
    objectives: [
      'Inorder, Preorder, and Postorder recursive BST traversals',
      'BST node insertion, deletion, and O(log N) search complexity'
    ],
    prerequisites: ['Stacks (LIFO) & Queues (FIFO)'],
    prerequisiteCompleted: true,
    resources: [
      {
        title: 'BST Recursive Traversal Flowchart',
        type: 'diagram',
        url: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=600'
      }
    ]
  }
];

export function getCalendarEventsForContext(context?: CourseContext): CalendarEvent[] {
  const univ = context?.university || '';
  const subj = context?.subjectCode || context?.subjectTitle || '';
  if (
    univ.includes('VTU') ||
    univ.includes('Visvesvaraya') ||
    subj.includes('1BCS') ||
    subj.includes('1BMAT') ||
    subj.includes('1BCP') ||
    subj.includes('Data Structures')
  ) {
    return VTU_CALENDAR_EVENTS;
  }
  return [
    {
      id: 'evt-1',
      title: 'Photosynthesis: The Plant Food Factory (40m Core)',
      topicId: 'ds-mod1-top1',
      module: 'NCERT Grade 7 Science',
      date: '2026-10-12',
      time: '10:00 AM - 10:45 AM',
      type: 'lesson',
      status: 'scheduled',
      objectives: [
        'Understand balanced photosynthesis equation 6CO2 + 6H2O -> C6H12O6 + 6O2',
        'Learn stomata guard cell gas regulation',
        'Perform Iodine starch test analysis'
      ],
      prerequisites: ['Plant Cell Structure Basics', 'Root Water Absorption'],
      prerequisiteCompleted: true,
      resources: [
        {
          title: 'Chloroplast & Stomata Diagram Notes',
          type: 'diagram',
          url: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=600',
          notes: 'Review leaf epidermal cross section and guard cell turgidity.'
        },
        {
          title: 'BBC Bitesize: Photosynthesis Molecular Mechanics',
          type: 'video',
          url: 'https://www.youtube.com/watch?v=LE2Xl5P4w3E',
          notes: 'Watch 8-minute animation on photon excitation.'
        }
      ]
    },
    {
      id: 'evt-2',
      title: 'Stomata Gas Exchange & Transpiration Dynamics',
      topicId: 'ds-mod1-top2',
      module: 'NCERT Grade 7 Science Chapter 1',
      date: '2026-10-14',
      time: '11:30 AM - 12:15 PM',
      type: 'lesson',
      status: 'scheduled',
      objectives: [
        'Guard cell osmotic turgidity and stomatal aperture regulation',
        'Distinguish daytime CO2 absorption from nighttime O2 release'
      ],
      prerequisites: ['Plant Cell & Chloroplasts'],
      prerequisiteCompleted: true,
      resources: [
        {
          title: 'Stomata Guard Cell Aperture Diagram',
          type: 'diagram',
          url: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=600',
          notes: 'Osmotic turgidity animation of kidney-shaped guard cells.'
        }
      ]
    }
  ];
}

export const VTU_ASSESSMENTS: StudentAssessmentRecord[] = [
  {
    id: 'asmt-vtu-1',
    studentId: 'std-0',
    studentName: 'Rahul Sharma',
    topic: '1BCS305: C Pointers & Memory Allocation',
    date: '2026-10-01',
    score: 9,
    maxScore: 10,
    masteryPercentage: 91,
    feedback: 'Excellent foundational grasp of pointer syntax (& and *) and struct Node definition.',
    mode: 'quiz'
  },
  {
    id: 'asmt-vtu-2',
    studentId: 'std-0',
    studentName: 'Rahul Sharma',
    topic: '1BCS305: Singly Linked List Traversals',
    date: '2026-10-04',
    score: 7,
    maxScore: 10,
    masteryPercentage: 72,
    feedback: 'Good understanding of head traversal; minor slip on NULL guard safety check.',
    mode: 'visual'
  },
  {
    id: 'asmt-vtu-3',
    studentId: 'std-0',
    studentName: 'Rahul Sharma',
    topic: '1BCS305: Node Insertion & malloc() Heap',
    date: '2026-10-07',
    score: 4,
    maxScore: 10,
    masteryPercentage: 48,
    feedback: 'Struggled with pointer reassignment when inserting node in middle. Remedial intervention assigned.',
    mode: 'quiz'
  }
];

export const NCERT_ASSESSMENTS: StudentAssessmentRecord[] = [
  {
    id: 'asmt-ncert-1',
    studentId: 'std-1',
    studentName: 'Aarav Sharma',
    topic: 'NCERT Ch 1: Plant Cell Structure & Chloroplasts',
    date: '2026-10-01',
    score: 5,
    maxScore: 10,
    masteryPercentage: 50,
    feedback: 'Basic understanding of cell structure; needs support on chloroplast thylakoid light absorption.',
    mode: 'quiz'
  },
  {
    id: 'asmt-ncert-2',
    studentId: 'std-1',
    studentName: 'Aarav Sharma',
    topic: 'NCERT Ch 1: Stomata Gas Exchange Dynamics',
    date: '2026-10-04',
    score: 4,
    maxScore: 10,
    masteryPercentage: 42,
    feedback: 'Struggles with guard cell turgidity and gas movement. Scaffolding assigned.',
    mode: 'visual'
  },
  {
    id: 'asmt-ncert-3',
    studentId: 'std-2',
    studentName: 'Priya Patel',
    topic: 'NCERT Ch 1: Photosynthesis Balanced Stoichiometry',
    date: '2026-10-07',
    score: 6,
    maxScore: 10,
    masteryPercentage: 60,
    feedback: 'Understands overall reaction but confuses reactant proportions under darkness.',
    mode: 'quiz'
  }
];

export function getAssessmentsForContext(context?: CourseContext): StudentAssessmentRecord[] {
  const univ = context?.university || '';
  const subj = context?.subjectCode || context?.subjectTitle || '';
  if (
    univ.includes('VTU') ||
    univ.includes('Visvesvaraya') ||
    subj.includes('1BCS') ||
    subj.includes('1BMAT') ||
    subj.includes('1BCP') ||
    subj.includes('Data Structures')
  ) {
    return VTU_ASSESSMENTS;
  }
  return NCERT_ASSESSMENTS;
}

export const INITIAL_STUDENTS: Student[] = [
  {
    id: 'std-0',
    name: 'Rahul Sharma',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    grade: 11,
    learningPace: 'slow',
    preferredLanguage: 'Bilingual',
    recentScores: [
      { quizName: 'TCP Handshake & Headers', score: 9, maxScore: 10, date: '2026-10-01' },
      { quizName: 'Flow & Sliding Window', score: 7, maxScore: 10, date: '2026-10-04' },
      { quizName: 'Slow Start & Congestion Control', score: 4, maxScore: 10, date: '2026-10-07' }
    ],
    weakConcepts: ['Slow Start Exponential Growth', 'Congestion Avoidance (AIMD)', 'Bufferbloat Dynamics'],
    masteredConcepts: ['TCP Basics & 3-Way Handshake', 'Port Numbers & Sockets'],
    riskScore: 82,
    riskReason: 'Confuses receiver-driven Flow Control (rwnd) with network-driven Congestion Control (cwnd); struggles with exponential window doubling calculations.',
    recommendedScaffolding: 'Use the "Water Pipe and Funnel" physical reservoir analogy with step-by-step RTT doubling worksheets.',
    learningTwin: {
      studentName: 'Rahul Sharma',
      subjectDomain: 'Computer Networks (CN) & CSE',
      conceptBreakdown: [
        { conceptName: 'TCP Basics & Handshake', masteryPercentage: 91, trend: 'improving', category: 'Foundational', status: 'mastered' },
        { conceptName: 'Flow Control (rwnd)', masteryPercentage: 72, trend: 'stable', category: 'Intermediate', status: 'moderate' },
        { conceptName: 'Slow Start (Exponential)', masteryPercentage: 48, trend: 'declining', category: 'Bottleneck', status: 'struggling' },
        { conceptName: 'Congestion Control (AIMD)', masteryPercentage: 55, trend: 'declining', category: 'Downstream', status: 'struggling' }
      ],
      cognitiveTraits: {
        strongAt: ['Physical real-world examples & packet analogies', 'Definition recall & socket basics'],
        weakAt: ['Multi-step window calculations', 'Application questions under timed pressure'],
        modalityPreference: 'Prefers voice explanations in Hindi/English + interactive visual simulators',
        learningPace: 'slow'
      },
      predictedDifficulty: {
        targetConcept: 'Congestion Avoidance & Window Scaling',
        riskPercentage: 82,
        recommendedIntervention: 'Provide bilingual "Water Pipe & Funnel" scaffold with interactive RTT packet doubling simulator.'
      },
      learningTrajectory: [
        { timestamp: '2026-10-01', concept: 'TCP Basics', deltaScore: 91, action: 'Quiz 1 Mastered' },
        { timestamp: '2026-10-04', concept: 'Flow Control', deltaScore: 72, action: 'Worksheet Passed' },
        { timestamp: '2026-10-07', concept: 'Slow Start', deltaScore: 48, action: 'Intervention Required' }
      ],
      explainableAdaptation: {
        studentName: 'Rahul Sharma',
        conceptName: 'Flow Control & Slow Start',
        adaptationHeadline: 'We moved Flow Control earlier because:',
        whyShikshaDidThis: [
          '4 recent answers were incorrect on TCP sliding window calculations',
          'Average response time increased 31% (42s avg vs 18s class baseline)',
          'Flow Control (rwnd) is a strict prerequisite before Congestion Control (cwnd)'
        ],
        previousPath: [
          'Flow Control',
          'Congestion Control',
          'Slow Start'
        ],
        newPath: [
          'Flow Control Revision (rwnd)',
          'Water Pipe Physical Analogy',
          'Quick Diagnostic Assessment (3 questions)',
          'Congestion Control (AIMD)'
        ],
        noveltyMessage: 'Don\'t just show: "AI personalized your path." Show: "Here\'s exactly why your path changed."'
      },
      conceptEvidences: [
        {
          conceptName: 'Slow Start',
          masteryPercentage: 48,
          evidenceItems: [
            { type: 'correct', icon: '✓', text: '3 correct conceptual definitions (Handshake & MSS size)', severity: 'success' },
            { type: 'mistake', icon: '✗', text: '2 application mistakes on cwnd exponential doubling formula', severity: 'danger' },
            { type: 'latency', icon: '⚠', text: 'High response latency (42.6s avg per calculation)', severity: 'warning' },
            { type: 'confidence', icon: '⚠', text: 'Low self-reported confidence rating (0.34)', severity: 'warning' },
            { type: 'repetition', icon: '↺', text: 'Repeated mistake: Confusing linear +1 MSS with exponential *2 growth', severity: 'danger' }
          ],
          evidenceFlow: [
            { step: 'Question', value: 'TCP cwnd = 4 MSS, 4 ACKs return. What is new cwnd?' },
            { step: 'Concept tested', value: 'Slow Start Exponential Doubling' },
            { step: 'Correct / incorrect', value: 'Incorrect (Selected 5 MSS instead of 8 MSS)' },
            { step: 'Confidence', value: '0.34 (Hesitant)' },
            { step: 'Time taken', value: '46.2 seconds (+31% hesitation)' },
            { step: 'Repeated mistake?', value: 'Yes (Confused additive increase with exponential doubling)' },
            { step: 'Mastery update', value: 'Mastery recalibrated: 58% → 48%' }
          ]
        },
        {
          conceptName: 'Flow Control',
          masteryPercentage: 72,
          evidenceItems: [
            { type: 'correct', icon: '✓', text: '4 correct answers on receiver buffer rwnd advertised window', severity: 'success' },
            { type: 'mistake', icon: '✗', text: '1 edge case mistake on Zero Window Probe (ZWP)', severity: 'warning' },
            { type: 'latency', icon: '✓', text: 'Normal response latency (18.2s avg)', severity: 'success' },
            { type: 'confidence', icon: '✓', text: 'High confidence rating (0.78)', severity: 'success' }
          ]
        }
      ]
    }
  },
  {
    id: 'std-1',
    name: 'Aarav Sharma',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    grade: 7,
    learningPace: 'slow',
    preferredLanguage: 'Hindi',
    recentScores: [
      { quizName: 'Plant Cell Structure', score: 5, maxScore: 10, date: '2026-09-28' },
      { quizName: 'Nutrient Transport in Plants', score: 4, maxScore: 10, date: '2026-10-02' }
    ],
    weakConcepts: ['Chloroplast Function', 'Chemical Equation Balancing', 'Light Reactions'],
    masteredConcepts: ['Plant Roots', 'Water Absorption'],
    riskScore: 86,
    riskReason: 'Struggles with abstract multi-step chemical reactions; needs visual & bilingual analogies.',
    recommendedScaffolding: 'Use the "Kitchen of the Plant" analogy in Hindi with step-by-step diagram highlights.',
    learningTwin: {
      studentName: 'Aarav Sharma',
      subjectDomain: 'Biology / Science',
      conceptBreakdown: [
        { conceptName: 'Plant Roots & Water', masteryPercentage: 94, trend: 'improving', category: 'Foundational', status: 'mastered' },
        { conceptName: 'Chloroplast Function', masteryPercentage: 70, trend: 'stable', category: 'Intermediate', status: 'moderate' },
        { conceptName: 'Stomata Gas Exchange', masteryPercentage: 42, trend: 'declining', category: 'Bottleneck', status: 'struggling' },
        { conceptName: 'Chemical Equation Balancing', masteryPercentage: 45, trend: 'declining', category: 'Downstream', status: 'struggling' }
      ],
      cognitiveTraits: {
        strongAt: ['Concrete visual analogies & "Plant Kitchen" metaphors', 'Recognizing plant structures'],
        weakAt: ['Abstract multi-step chemical reaction balancing', 'Formulas with subscripts'],
        modalityPreference: 'Prefers bilingual Hindi/English voice explanations + annotated diagrams',
        learningPace: 'slow'
      },
      predictedDifficulty: {
        targetConcept: 'Chemical Stoichiometry & Light Reaction ATP Fixation',
        riskPercentage: 86,
        recommendedIntervention: 'Deploy the "Kitchen of the Leaf" bilingual recipe with step-by-step molecular counts.'
      },
      learningTrajectory: [
        { timestamp: '2026-09-28', concept: 'Plant Cell Structure', deltaScore: 50, action: 'Diagnostic Quiz' },
        { timestamp: '2026-10-02', concept: 'Nutrient Transport', deltaScore: 40, action: 'Remedial Review' }
      ]
    }
  },
  {
    id: 'std-2',
    name: 'Priya Patel',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    grade: 7,
    learningPace: 'slow',
    preferredLanguage: 'Bilingual',
    recentScores: [
      { quizName: 'Plant Cell Structure', score: 6, maxScore: 10, date: '2026-09-28' },
      { quizName: 'Nutrient Transport in Plants', score: 5, maxScore: 10, date: '2026-10-02' }
    ],
    weakConcepts: ['Stomata Gas Exchange', 'Chlorophyll role in light capture'],
    masteredConcepts: ['Leaf anatomy basics'],
    riskScore: 78,
    riskReason: 'Confuses respiratory gas exchange with photosynthetic gas exchange.',
    recommendedScaffolding: 'Provide bilingual side-by-side comparison table for CO2 vs O2 movement.',
    learningTwin: {
      studentName: 'Priya Patel',
      subjectDomain: 'Biology / Science',
      conceptBreakdown: [
        { conceptName: 'Leaf Anatomy Basics', masteryPercentage: 88, trend: 'improving', category: 'Foundational', status: 'mastered' },
        { conceptName: 'Chlorophyll Photons', masteryPercentage: 74, trend: 'stable', category: 'Intermediate', status: 'moderate' },
        { conceptName: 'Stomata Gas Dynamics', masteryPercentage: 46, trend: 'declining', category: 'Bottleneck', status: 'struggling' },
        { conceptName: 'Photosynthetic Respiration', masteryPercentage: 52, trend: 'declining', category: 'Downstream', status: 'struggling' }
      ],
      cognitiveTraits: {
        strongAt: ['Visual diagram inspection & color-coded worksheets', 'Pair learning discussions'],
        weakAt: ['Distinguishing daytime CO2 absorption from nighttime O2 release'],
        modalityPreference: 'Prefers side-by-side bilingual comparative tables + audio hints',
        learningPace: 'slow'
      },
      predictedDifficulty: {
        targetConcept: 'Guard Cell Osmotic Turgidity & Transpiration Pull',
        riskPercentage: 78,
        recommendedIntervention: 'Provide side-by-side dual-column table for Daytime vs Nighttime stomata movement.'
      },
      learningTrajectory: [
        { timestamp: '2026-09-28', concept: 'Plant Cell Structure', deltaScore: 60, action: 'Quiz 1' },
        { timestamp: '2026-10-02', concept: 'Nutrient Transport', deltaScore: 50, action: 'Formative Check' }
      ]
    }
  },
  {
    id: 'std-3',
    name: 'Rohan Verma',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    grade: 7,
    learningPace: 'slow',
    preferredLanguage: 'Hindi',
    recentScores: [
      { quizName: 'Plant Cell Structure', score: 4, maxScore: 10, date: '2026-09-28' },
      { quizName: 'Nutrient Transport in Plants', score: 4, maxScore: 10, date: '2026-10-02' }
    ],
    weakConcepts: ['Chemical Equation Balancing', 'Stroma vs Thylakoids'],
    masteredConcepts: ['Sunlight necessity'],
    riskScore: 84,
    riskReason: 'Low test stamina; requires bite-sized 2-minute checkpoint questions.',
    recommendedScaffolding: 'Pair with peer buddy for guided inquiry; offer phonetic Hindi audio terms.',
    learningTwin: {
      studentName: 'Rohan Verma',
      subjectDomain: 'Biology / Science',
      conceptBreakdown: [
        { conceptName: 'Sunlight Energy Basics', masteryPercentage: 92, trend: 'stable', category: 'Foundational', status: 'mastered' },
        { conceptName: 'Chloroplast Stroma', masteryPercentage: 68, trend: 'stable', category: 'Intermediate', status: 'moderate' },
        { conceptName: 'Thylakoid Light Reaction', masteryPercentage: 45, trend: 'declining', category: 'Bottleneck', status: 'struggling' },
        { conceptName: 'Chemical Equation Balancing', masteryPercentage: 42, trend: 'declining', category: 'Downstream', status: 'struggling' }
      ],
      cognitiveTraits: {
        strongAt: ['Hands-on leaf tactile inspection', 'Short bite-sized questions'],
        weakAt: ['Long multi-paragraph texts', 'Calculations without visual diagrams'],
        modalityPreference: 'Prefers bite-sized 2-minute voice checkpoints and peer buddy pairing',
        learningPace: 'slow'
      },
      predictedDifficulty: {
        targetConcept: 'Chemical Equation Stoichiometry & Glucose Storage',
        riskPercentage: 84,
        recommendedIntervention: 'Break questions into 2-minute micro-steps with immediate audio verification.'
      },
      learningTrajectory: [
        { timestamp: '2026-09-28', concept: 'Plant Cell Structure', deltaScore: 40, action: 'Quiz 1' },
        { timestamp: '2026-10-02', concept: 'Nutrient Transport', deltaScore: 40, action: 'Review' }
      ]
    }
  },
  {
    id: 'std-4',
    name: 'Sneha Gupta',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    grade: 7,
    learningPace: 'standard',
    preferredLanguage: 'English',
    recentScores: [
      { quizName: 'Plant Cell Structure', score: 8, maxScore: 10, date: '2026-09-28' },
      { quizName: 'Nutrient Transport in Plants', score: 7, maxScore: 10, date: '2026-10-02' }
    ],
    weakConcepts: ['Transpiration pull'],
    masteredConcepts: ['Chloroplast Function', 'Stomata Gas Exchange'],
    riskScore: 32,
    riskReason: 'Consistent performer; ready for standard pacing.',
    recommendedScaffolding: 'Standard interactive worksheets and active group discussions.',
    learningTwin: {
      studentName: 'Sneha Gupta',
      subjectDomain: 'Biology / Science',
      conceptBreakdown: [
        { conceptName: 'Plant Cell Structure', masteryPercentage: 92, trend: 'improving', category: 'Foundational', status: 'mastered' },
        { conceptName: 'Stomata Mechanics', masteryPercentage: 85, trend: 'improving', category: 'Intermediate', status: 'mastered' },
        { conceptName: 'Equation Balancing', masteryPercentage: 78, trend: 'stable', category: 'Core', status: 'moderate' },
        { conceptName: 'Transpiration Pull', masteryPercentage: 62, trend: 'stable', category: 'Extension', status: 'moderate' }
      ],
      cognitiveTraits: {
        strongAt: ['Note-taking & color-coded notebook worksheets', 'Group discussion facilitation'],
        weakAt: ['Advanced physics of water capillary tension'],
        modalityPreference: 'Standard written worksheets + interactive digital quizzes',
        learningPace: 'standard'
      },
      predictedDifficulty: {
        targetConcept: 'Transpiration Xylem Tension Mechanics',
        riskPercentage: 32,
        recommendedIntervention: 'Assign standard lab worksheet with peer buddy review.'
      },
      learningTrajectory: [
        { timestamp: '2026-09-28', concept: 'Plant Cell Structure', deltaScore: 80, action: 'Passed' },
        { timestamp: '2026-10-02', concept: 'Nutrient Transport', deltaScore: 70, action: 'Passed' }
      ]
    }
  },
  {
    id: 'std-5',
    name: 'Vihaan Reddy',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    grade: 7,
    learningPace: 'fast',
    preferredLanguage: 'English',
    recentScores: [
      { quizName: 'Plant Cell Structure', score: 10, maxScore: 10, date: '2026-09-28' },
      { quizName: 'Nutrient Transport in Plants', score: 9, maxScore: 10, date: '2026-10-02' }
    ],
    weakConcepts: [],
    masteredConcepts: ['All cellular processes', 'Equation balancing', 'Light spectra'],
    riskScore: 12,
    riskReason: 'High mastery; requires extension activities to avoid disengagement.',
    recommendedScaffolding: 'Assign the Advanced Calvin Cycle & Rate of Photosynthesis experiment challenge.',
    learningTwin: {
      studentName: 'Vihaan Reddy',
      subjectDomain: 'Biology / Science',
      conceptBreakdown: [
        { conceptName: 'Cellular Biochemistry', masteryPercentage: 98, trend: 'improving', category: 'Advanced', status: 'mastered' },
        { conceptName: 'Light Reactions & Photons', masteryPercentage: 96, trend: 'improving', category: 'Advanced', status: 'mastered' },
        { conceptName: 'Calvin Cycle & Fixation', masteryPercentage: 92, trend: 'improving', category: 'Extension', status: 'mastered' },
        { conceptName: 'Rate of Photosynthesis (BBR)', masteryPercentage: 88, trend: 'improving', category: 'Extension', status: 'mastered' }
      ],
      cognitiveTraits: {
        strongAt: ['High-order hypothesis formulation', 'Experimental data analysis & curve fitting'],
        weakAt: ['Routine repetitive worksheets (causes disengagement)'],
        modalityPreference: 'Prefers open-ended inquiry challenges & computer simulations',
        learningPace: 'fast'
      },
      predictedDifficulty: {
        targetConcept: 'C4/CAM Desert Plant Carbon Fixation Pathways',
        riskPercentage: 12,
        recommendedIntervention: 'Offer the Advanced Calvin Cycle & Hydrilla light wavelength experiment challenge.'
      },
      learningTrajectory: [
        { timestamp: '2026-09-28', concept: 'Cell Biochemistry', deltaScore: 100, action: 'Exceeded' },
        { timestamp: '2026-10-02', concept: 'Nutrient Transport', deltaScore: 90, action: 'Exceeded' }
      ]
    }
  },
  {
    id: 'std-7',
    name: 'Prajwal Gowda',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
    grade: 7,
    learningPace: 'slow',
    preferredLanguage: 'Kannada',
    recentScores: [
      { quizName: 'Plant Cell Structure', score: 4, maxScore: 10, date: '2026-09-28' },
      { quizName: 'Nutrient Transport in Plants', score: 5, maxScore: 10, date: '2026-10-02' }
    ],
    weakConcepts: ['Stomata Gas Dynamics', 'Chemical Stoichiometry'],
    masteredConcepts: ['Plant Roots', 'Sunlight absorption'],
    riskScore: 82,
    riskReason: 'Struggles with English-only chemistry terms; thrives with Kannada (ಕನ್ನಡ) visual analogies and audio hints.',
    recommendedScaffolding: 'Provide bilingual Kannada-English "ಸಸ್ಯದ ಅಡುಗೆಮನೆ" (Plant Kitchen) scaffolding with voice prompts.',
    learningTwin: {
      studentName: 'Prajwal Gowda',
      subjectDomain: 'Biology / Science',
      conceptBreakdown: [
        { conceptName: 'Plant Roots & Sunlight', masteryPercentage: 90, trend: 'stable', category: 'Foundational', status: 'mastered' },
        { conceptName: 'Chlorophyll Absorption', masteryPercentage: 72, trend: 'stable', category: 'Intermediate', status: 'moderate' },
        { conceptName: 'Stomata Gas Dynamics', masteryPercentage: 44, trend: 'declining', category: 'Bottleneck', status: 'struggling' },
        { conceptName: 'Chemical Stoichiometry', masteryPercentage: 48, trend: 'declining', category: 'Downstream', status: 'struggling' }
      ],
      cognitiveTraits: {
        strongAt: ['Kannada audio explanations & experiential nature observations'],
        weakAt: ['English-only terminology without Kannada bridge vocabulary'],
        modalityPreference: 'Prefers Kannada (ಕನ್ನಡ) audio with bilingual visual cards',
        learningPace: 'slow'
      },
      predictedDifficulty: {
        targetConcept: 'Chemical Stoichiometry Equation Balancing',
        riskPercentage: 82,
        recommendedIntervention: 'Provide bilingual Kannada-English "ಸಸ್ಯದ ಅಡುಗೆಮನೆ" (Plant Kitchen) audio hints.'
      },
      learningTrajectory: [
        { timestamp: '2026-09-28', concept: 'Plant Roots', deltaScore: 40, action: 'Quiz 1' },
        { timestamp: '2026-10-02', concept: 'Nutrient Transport', deltaScore: 50, action: 'Remedial Kannada' }
      ]
    }
  }
];

export const INITIAL_DOCUMENTS: DocumentSource[] = [
  {
    id: 'doc-ncert-2026',
    title: 'NCERT Grade 7 Science - Chapter 1: Nutrition in Plants (2026 Revised)',
    filename: 'NCERT_Grade7_Science_Ch1_2026.pdf',
    type: 'textbook',
    uploadDate: '2026-09-15',
    versionYear: 2026,
    trustScore: 98,
    fileSize: '4.2 MB',
    status: 'active',
    relevantPages: 'Pages 12–16 (Section 1.2: Photosynthesis — Food Making Process in Plants)',
    summary: 'Official 2026 curriculum textbook. Outlines the balanced equation 6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂, stomatal guard cells mechanism, chlorophyll light absorption, and iodine starch test.',
    extractedSnippet: 'Section 1.2: Leaves are the food factories of plants. Water and minerals are transported to leaves by vessels which run like pipes through roots, stem, branches and leaves (Xylem). Carbon dioxide from air is taken in through tiny pores on leaf surface called Stomata.',
    citationKey: 'NCERT 2026, Ch. 1, pp. 12-16',
    pdfPages: [
      {
        pageNumber: 1,
        title: 'Chapter 1: Nutrition in Plants - Introduction & Autotrophs',
        content: 'In Class 6 you learned that food is essential for all living organisms. Carbohydrates, proteins, fats, vitamins and minerals are components of food called nutrients. Plants are the only organisms that can prepare food for themselves by using water, carbon dioxide and minerals. The mode of nutrition in which organisms make food themselves from simple substances is called autotrophic (auto = self, trophos = nourishment) nutrition.',
        keyPoints: [
          'Autotrophs: Organisms that synthesize organic nutrients from inorganic raw materials.',
          'Nutrients required: Water (H2O), Carbon Dioxide (CO2), Sunlight, Minerals.',
          'Chlorophyll: Green pigment in leaves that traps radiant photon energy from sunlight.'
        ],
        diagramDescription: 'Figure 1.1: General classification of autotrophic vs heterotrophic nutritional pathways in flora.'
      },
      {
        pageNumber: 2,
        title: 'Section 1.2: Photosynthesis — Food Making Process in Plants',
        content: 'Leaves are the food factories of plants. Therefore, all the raw materials must reach the leaf. Water and minerals present in the soil are absorbed by the roots and transported to the leaves by xylem vessels. Carbon dioxide from air is taken in through tiny pores present on the surface of leaves. These pores are surrounded by ‘guard cells’. Such pores are called stomata. During photosynthesis, chlorophyll-containing cells of leaves synthesize carbohydrates using CO2 and water in presence of sunlight.',
        keyPoints: [
          'Balanced Equation: 6CO₂ + 6H₂O + Sunlight + Chlorophyll → C₆H₁₂O₆ (Glucose) + 6O₂ (Oxygen)',
          'Stomata: Microscopic pores bounded by two kidney-shaped guard cells regulating gas exchange and transpiration.',
          'Carbohydrates produced are ultimately stored in leaves and stems as Starch.'
        ],
        diagramDescription: 'Figure 1.2: Cross-section of a green leaf showing epidermis, stomatal pore, guard cells, and chloroplasts in mesophyll cells.'
      },
      {
        pageNumber: 3,
        title: 'Section 1.3: Activity 1.1 — The Starch Iodine Laboratory Test',
        content: 'Take two potted plants of the same kind. Keep one in the dark room for 72 hours and the other in continuous sunlight. Perform an iodine test with the leaves of both plants as you did in Class 6. Record your results. Now leave the pot which was earlier kept in the dark, in the sunlight for 3–4 days and perform the iodine test again on its leaves.',
        keyPoints: [
          'Observation: Leaf exposed to sunlight turns deep blue-black upon application of dilute Iodine solution.',
          'Control Leaf: Leaf kept in darkness does not turn blue-black (no starch synthesis without photon excitation).',
          'Scientific Conclusion: Sunlight and chlorophyll are non-negotiable prerequisites for photosynthesis.'
        ],
        diagramDescription: 'Figure 1.3: Iodine test on green leaf (Boiling in alcohol bath, washing in warm water, and iodine drop test).'
      },
      {
        pageNumber: 4,
        title: 'Section 1.4: Synthesis of Plant Food other than Carbohydrates',
        content: 'You have just learned that plants synthesize carbohydrates through photosynthesis. The carbohydrates are made of carbon, hydrogen and oxygen. These are used to synthesize other components of food such as proteins and fats. But proteins are nitrogenous substances which contain nitrogen. Nitrogen is present in abundance in gaseous form (78%) in the air, but plants cannot absorb it in this form. Soil has certain bacteria (e.g. Rhizobium) that convert gaseous nitrogen into a usable form and release it into the soil.',
        keyPoints: [
          'Carbohydrates provide the C-H-O skeleton for organic synthesis.',
          'Nitrogen fixation: Symbiotic Rhizobium bacteria in leguminous root nodules fix atmospheric N2 into soluble nitrates.',
          'Fertilizers: Farmers replenish soil nitrogen via NPK supplements.'
        ]
      }
    ]
  },
  {
    id: 'doc-notes-2021',
    title: 'Teacher Archive Notes - Photosynthesis 2021 (Old Syllabus)',
    filename: 'Class7_Science_Photosynthesis_Notes_2021.pdf',
    type: 'notes',
    uploadDate: '2026-08-10',
    versionYear: 2021,
    trustScore: 42,
    fileSize: '1.1 MB',
    status: 'outdated_ignored',
    relevantPages: 'Page 3-4',
    summary: 'Outdated handwritten classroom summary from 2021 containing superseded terminology and an unbalanced word formula without oxygen molecule stoichiometry.',
    extractedSnippet: 'Old Note excerpt: "Plants make food using sunlight + water + carbon dioxide to make sugar. No need to teach 6CO2 balanced stoichiometry in Class 7."',
    conflictReason: 'Direct curriculum conflict: 2026 NCERT specifically mandates introducing the balanced 6-carbon molecular formula and modern terminology for stomata guard cell turgidity.',
    citationKey: 'Old Notes 2021 (Ignored)',
    pdfPages: [
      {
        pageNumber: 1,
        title: 'Teacher Notes (2021 Archive) - Photosynthesis Quick Review',
        content: 'Plants prepare their food in leaves. Raw materials: Water from soil, carbon dioxide from atmosphere, sunlight from sun. The food produced is glucose/sugar. Note for teachers: Keep equations simple, do not introduce chemical formulas or molecular balancing in Grade 7.',
        keyPoints: [
          'Simple word equation: Water + Carbon Dioxide -> Sugar + Oxygen (No balancing)',
          'No mention of chloroplast thylakoids or guard cell osmotic turgidity.',
          'Status: Flagged as Outdated by Epistemic Trust Engine.'
        ]
      }
    ]
  },
  {
    id: 'doc-curriculum-guideline',
    title: 'CBSE / State Educational Board Pedagogical Guideline 2026-27',
    filename: 'Pedagogical_Framework_MiddleSchool_Science_2026.pdf',
    type: 'curriculum_guide',
    uploadDate: '2026-09-01',
    versionYear: 2026,
    trustScore: 95,
    fileSize: '3.8 MB',
    status: 'active',
    relevantPages: 'Pages 45–48',
    summary: 'Prescribes experiential learning, bilingual scaffolded glossary in Hindi/vernacular, and formative risk checks before the mid-term examinations.',
    extractedSnippet: 'Recommend active visual analogies for biological processes. Teachers must provide tiered explanations for first-generation multilingual learners.',
    citationKey: 'Board Guideline 2026, p. 46',
    pdfPages: [
      {
        pageNumber: 1,
        title: 'Pedagogical Framework 2026 - Multilingual Scaffolding Directives',
        content: 'For foundational science concepts in middle school (Grades 6-8), teachers are strongly advised to incorporate dual-language terminology. In multilingual classrooms with Hindi and Kannada speakers, conceptual anchor words (such as Photosynthesis / प्रकाश संश्लेषण / ದ್ಯುತಿಸಂಶ್ಲೇಷಣೆ) should be reinforced with everyday analogies (e.g., "The Plant Kitchen").',
        keyPoints: [
          'Mandate: Multimodal instruction with visual, auditory, and experiential components.',
          'Target: At-risk learners requiring Tier-2 and Tier-3 scaffolding.',
          'Bilingual vocabulary sheets required before formative quizzes.'
        ]
      }
    ]
  },
  {
    id: 'doc-fractions-math',
    title: 'NCERT Grade 6 Mathematics - Chapter 7: Fractions',
    filename: 'NCERT_Grade6_Math_Fractions_2026.pdf',
    type: 'textbook',
    uploadDate: '2026-09-10',
    versionYear: 2026,
    trustScore: 99,
    fileSize: '5.4 MB',
    status: 'active',
    relevantPages: 'Pages 134–142',
    summary: 'Covers Equivalent fractions using visual strip models, pizza slices, and cross-multiplication verification.',
    extractedSnippet: 'Two or more fractions are equivalent if they represent the same portion of a whole. Multiplying or dividing both numerator and denominator by same non-zero number yields an equivalent fraction.',
    citationKey: 'NCERT Math 2026, Ch. 7, pp. 134-142',
    pdfPages: [
      {
        pageNumber: 1,
        title: 'Chapter 7: Fractions - Equivalent Fractions & Visual Strips',
        content: 'A fraction is a number representing part of a whole. The whole may be a single object or a group of objects. When looking at equivalent fractions like 1/2, 2/4, 3/6, and 4/8, each fraction represents the exact same shaded fraction of the strip model.',
        keyPoints: [
          'To find equivalent fractions, multiply or divide numerator and denominator by the same number.',
          'Visual strip modeling reinforces concrete understanding before abstract arithmetic.',
          'Simplest form: When numerator and denominator have no common factor except 1.'
        ],
        diagramDescription: 'Figure 7.4: Fraction strip breakdown comparing 1/2, 2/4, 4/8, and 8/16.'
      }
    ]
  }
];

export const DEFAULT_VTU_DSA_LESSON_40MIN: LessonPlan = {
  id: 'lesson-vtu-dsa-40',
  topic: '1BCS305: Singly Linked Lists & Dynamic Memory Allocation',
  topicHindi: 'डेटा स्ट्रक्चर: सिंगली लिंक्ड लिस्ट और पॉइंटर्स',
  topicKannada: 'ಡೇಟಾ ಸ್ಟ್ರಕ್ಚರ್‌ಗಳು: ಲಿಂಕ್ಡ್ ಲಿಸ್ಟ್‌ಗಳು ಮತ್ತು ಮೆಮೊರಿ',
  grade: 3,
  subject: '1BCS305 - Data Structures and Applications (VTU 2025)',
  totalDurationMinutes: 40,
  targetExamDate: 'SEE Exam (VTU Scheme 2025)',
  languages: ['English', 'Hindi', 'Kannada'],
  predictedGapsCount: 3,
  highRiskStudents: ['Aarav Sharma', 'Priya Patel', 'Rohan Verma', 'Prajwal Gowda'],
  approvalState: 'draft',
  lastUpdated: 'Just now',
  
  sourcesUsed: [
    {
      sourceId: 'doc-vtu-dsa-2025',
      citation: 'VTU Scheme 2025 1BCS305 Module 3 (Pages 1–12)',
      reason: 'Primary verified curriculum ground truth for singly linked lists, dynamic allocation, and pointer traversal.'
    },
    {
      sourceId: 'doc-horowitz-ds',
      citation: 'Fundamentals of Data Structures in C (Horowitz & Sahni, 2nd Ed)',
      reason: 'Standard prescribed VTU textbook for C pointer node memory layout and O(1) splice operations.'
    }
  ],

  ignoredSources: [
    {
      sourceId: 'doc-notes-2021',
      reason: 'Ignored older non-VTU notes due to missing 2025 VTU 1BCS305 C structure standards.'
    }
  ],

  beginnerExplanation: {
    summary: 'A Singly Linked List is like a train of data boxes connected by memory pointers in RAM. You can insert or delete nodes in O(1) time without shifting all elements!',
    summaryHindi: 'लिंक्ड लिस्ट RAM में पॉइंटर्स द्वारा जुड़े डेटा बॉक्स की एक ट्रेन की तरह है। आप बिना सभी एलिमेंट्स को शिफ्ट किए O(1) समय में नोड जोड़ सकते हैं!',
    summaryKannada: 'ಲಿಂಕ್ಡ್ ಲಿಸ್ಟ್ ಎಂಬುದು ಪಾಯಿಂಟರ್‌ಗಳಿಂದ ಸಂಪರ್ಕಗೊಂಡಿರುವ ಡೇಟಾ ಬಾಕ್ಸ್‌ಗಳ ಸರಣಿಯಾಗಿದೆ. ಸಂಪೂರ್ಣ ಡೇಟಾವನ್ನು ಸ್ಥಳಾಂತರಿಸದೆ O(1) ಸಮಯದಲ್ಲಿ ನೋಡ್‌ಗಳನ್ನು ಸೇರಿಸಬಹುದು!',
    keyAnalogy: 'The "RAM Treasure Hunt": Node A holds data (e.g., 10) and the RAM memory address of Node B. Following pointers leads step-by-step through memory!',
    keyAnalogyHindi: 'RAM ट्रेजर हंट: प्रत्येक नोड में डेटा और अगले नोड का मेमोरी एड्रेस पॉइंटर होता है!',
    keyAnalogyKannada: 'RAM ಟ್ರೆಷರ್ ಹಂಟ್: ಪ್ರತಿಯೊಂದು ನೋಡ್ ಡೇಟಾ ಮತ್ತು ಮುಂದಿನ ನೋಡ್‌ನ ಮೆಮೊರಿ ವಿಳಾಸದ ಪಾಯಿಂಟರ್ ಹೊಂದಿರುತ್ತದೆ!',
    visualCues: [
      'RAM contiguous vs non-contiguous pointer linked memory layout',
      'Head pointer pointing to start node (0x1004)',
      'New Node malloc(sizeof(Node)) pointer reassignment step-by-step'
    ],
    vocabularyGlossary: [
      { term: 'Singly Linked List', hindiTerm: 'सिंगली लिंक्ड लिस्ट', kannadaTerm: 'ಸಿಂಗಿಲಿ ಲಿಂಕ್ಡ್ ಲಿಸ್ಟ್', definition: 'Linear collection of data nodes connected via next pointers' },
      { term: 'Pointer (*next)', hindiTerm: 'पॉइंटर्स (Pointer)', kannadaTerm: 'ಪಾಯಿಂಟರ್ಸ್ (Pointer)', definition: 'Variable holding the memory address of another node in RAM' },
      { term: 'malloc()', hindiTerm: 'डाइनैमिक मेमोरी (Dynamic Memory)', kannadaTerm: 'ಡೈನಾಮಿಕ್ ಮೆಮೊರಿ', definition: 'C library function to allocate memory dynamically on the heap' },
      { term: 'Head Pointer', hindiTerm: 'हेड पॉइंटर (Head)', kannadaTerm: 'ಹೆಡ್ ಪಾಯಿಂಟರ್ (Head)', definition: 'Pointer holding the start memory address of the linked list' }
    ],
    targetStudents: ['Aarav Sharma', 'Priya Patel', 'Rohan Verma', 'Prajwal Gowda']
  },

  standardLesson: {
    objectives: [
      'Understand Singly Linked List structure and dynamic heap memory allocation via malloc().',
      'Demonstrate step-by-step O(1) Node Insertion at head, tail, and middle positions.',
      'Write C code for create(), display(), and insert() functions as specified in VTU 1BCS305 syllabus.',
      'Compare time and space complexity of Linked Lists vs Contiguous Arrays.'
    ],
    objectivesHindi: [
      'सिंगली लिंक्ड लिस्ट संरचना और malloc() द्वारा डाइनैमिक मेमोरी आवंटन को समझें।',
      'हेड, टेल और मिडिल पोजीशन पर स्टेप-बाय-स्टेप O(1) नोड इंसर्शन का प्रदर्शन करें।',
      'VTU 1BCS305 पाठ्यक्रम के अनुसार C फंक्शंस (create, display, insert) लिखें।',
      'लिंक्ड लिस्ट और ऐरे की टाइम/स्पेस कॉम्प्लेक्सिटी की तुलना करें।'
    ],
    objectivesKannada: [
      'ಸಿಂಗಿಲಿ ಲಿಂಕ್ಡ್ ಲಿಸ್ಟ್ ರಚನೆ ಮತ್ತು malloc() ಮೂಲಕ ಡೈನಾಮಿಕ್ ಮೆಮೊರಿಯನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಿ.',
      'ಹೆಡ್ ಮತ್ತು ಮಿಡಲ್ ಪೊಸಿಷನ್‌ನಲ್ಲಿ ಹಂತ-ಹಂತದ O(1) ನೋಡ್ ಸೇರ್ಪಡೆಯನ್ನು ಪ್ರದರ್ಶಿಸಿ.',
      'VTU 1BCS305 ಪಠ್ಯಕ್ರಮದ ಪ್ರಕಾರ C ಪ್ರೋಗ್ರಾಂ ಕೋಡ್ ಬರೆಯಿರಿ (create, display, insert).',
      'ಲಿಂಕ್ಡ್ ಲಿಸ್ಟ್‌ಗಳು ಮತ್ತು ಅರೇಗಳ ಸಮಯ ಮತ್ತು ಸ್ಥಳ ಸಂಕೀರ್ಣತೆಯನ್ನು ಹೋಲಿಕೆ ಮಾಡಿ.'
    ],
    sections: [
      {
        id: 'sec-vtu-1',
        timeAllocationMinutes: 5,
        title: 'The Hook: Array Shifting Bottleneck vs Pointer Splice',
        titleHindi: 'शुरुआत: ऐरे शिफ्टिंग बनाम पॉइंटर स्प्लिस',
        titleKannada: 'ಆರಂಭ: ಅರೇ ಶಿಫ್ಟಿಂಗ್ ಬಾಟಲ್‌ನಲ್ ವರ್ಸಸ್ ಪಾಯಿಂಟರ್ ಸ್ಪ್ಲೈಸ್',
        icon: 'Sparkles',
        teacherTalkingPoints: [
          '"Imagine a line of 1,000 students standing in an array. To insert a new student at position 1, all 999 students must step back (O(N) time!)."',
          '"Now imagine each student holds a slip of paper pointing to the next student. To insert, simply change two slips of paper (O(1) time!)."',
          '"This is why VTU 1BCS305 prescribes Linked Lists for dynamic memory management."'
        ],
        teacherTalkingPointsHindi: [
          'एक लाइन में 1,000 छात्रों की कल्पना करें। पोजीशन 1 पर नए छात्र को जोड़ने के लिए सभी 999 छात्रों को पीछे हटना पड़ेगा (O(N) टाइम)।',
          'अब यदि प्रत्येक छात्र के पास अगले का एड्रेस पर्ची में है, तो केवल दो पर्चियों को बदलना होगा (O(1) टाइम)।',
          'इसीलिए VTU 1BCS305 में लिंक्ड लिस्ट सीखी जाती है।'
        ],
        teacherTalkingPointsKannada: [
          'ಸಾಲು ಹೊಂದಿರುವ 1,000 ವಿದ್ಯಾರ್ಥಿಗಳನ್ನು ಊಹಿಸಿ. 1 ನೇ ಸ್ಥಾನದಲ್ಲಿ ಹೊಸಬರನ್ನು ಸೇರಿಸಲು ಎಲ್ಲ 999 ಜನರು ಹಿಂದೆ ಚಲಿಸಬೇಕು (O(N)).',
          'ಲಿಂಕ್ಡ್ ಲಿಸ್ಟ್‌ನಲ್ಲಿ ಕೇವಲ ಎರಡು ಪಾಯಿಂಟರ್‌ಗಳನ್ನು ಬದಲಾಯಿಸಿದರೆ ಸಾಕು (O(1)).'
        ],
        studentActivities: [
          'Trace memory pointers on paper worksheets.',
          'Group discussion: "When is an array better than a linked list? (Answer: O(1) random index access)"'
        ],
        scaffoldingTips: 'Show C structure definition struct Node { int data; struct Node* next; } on the screen.',
        groundedInCitation: 'VTU 2025 Scheme 1BCS305, Module 3, p. 1'
      },
      {
        id: 'sec-vtu-2',
        timeAllocationMinutes: 15,
        title: 'Direct Instruction: Node Memory Structure & C Pointer Reassignment',
        titleHindi: 'प्रत्यक्ष शिक्षण: नोड संरचना और पॉइंटर असाइनमेंट',
        titleKannada: 'ಮುಖ್ಯ ಬೋಧನೆ: ನೋಡ್ ಮೆಮೊರಿ ರಚನೆ ಮತ್ತು C ಪಾಯಿಂಟರ್ ಕೋಡಿಂಗ್',
        icon: 'Code',
        teacherTalkingPoints: [
          'Explain struct Node layout in RAM heap: data field + next pointer field.',
          'Demonstrate step 1: newNode = (Node*)malloc(sizeof(Node)); newNode->data = 15;',
          'Demonstrate step 2: newNode->next = prevNode->next;',
          'Demonstrate step 3: prevNode->next = newNode;'
        ],
        teacherTalkingPointsHindi: [
          'C में नोड स्ट्रक्चर: struct Node { int data; struct Node* next; };',
          'स्टेप 1: malloc() से नई मेमोरी का आवंटन।',
          'स्टेप 2 और 3: पॉइंटर्स का पुनर्नियोजन।'
        ],
        teacherTalkingPointsKannada: [
          'C ಪ್ರೋಗ್ರಾಮಿಂಗ್‌ನಲ್ಲ ನೋಡ್ ರಚನೆ ಮತ್ತು ಪಾಯಿಂಟರ್ ನಿಯೋಜನೆ.',
          'malloc() ಮೂಲಕ ಹೊಸ ಮೆಮೊರಿ ಪಡೆಯುವುದು ಮತ್ತು ಪಾಯಿಂಟರ್‌ಗಳನ್ನು ನವೀಕರಿಸುವುದು.'
        ],
        studentActivities: [
          'Interactive C code step execution in Visual Studio.',
          'Draw node pointer diagrams on whiteboards.'
        ],
        scaffoldingTips: 'Provide bilingual memory pointer definitions for Aarav and Priya.',
        groundedInCitation: 'Horowitz & Sahni, Fundamentals of Data Structures in C, 2nd Ed.'
      }
    ]
  },

  advancedActivity: {
    title: 'Advanced Inquiry: Doubly Linked Lists & Memory Fragmentation in Dynamic Allocation',
    titleHindi: 'उच्च स्तरीय खोज: डबली लिंक्ड लिस्ट और मेमोरी फ़्रैग्मेंटेशन',
    titleKannada: 'ಮುಂದುವರಿದ ಅನ್ವೇಷಣೆ: ಡಬ್ಲಿ ಲಿಂಕ್ಡ್ ಲಿಸ್ಟ್ ಮತ್ತು ಮೆಮೊರಿ',
    inquiryChallenge: 'Analyze why Doubly Linked Lists require 2 pointers per node (*prev and *next), and compare memory overhead vs Singly Linked Lists under heap fragmentation.',
    inquiryChallengeHindi: 'विश्लेषण करें कि डबली लिंक्ड लिस्ट को नोड प्रति 2 पॉइंटर्स क्यों चाहिए, और मेमोरी ओवरहेड की तुलना करें।',
    inquiryChallengeKannada: 'ಡಬ್ಲಿ ಲಿಂಕ್ಡ್ ಲಿಸ್ಟ್‌ಗಳು ಏಕೆ 2 ಪಾಯಿಂಟರ್‌ಗಳನ್ನು ಹೊಂದಿವೆ ಮತ್ತು ಮೆಮೊರಿ ಓವರ್‌ಹೆಡ್ ಹೋಲಿಸಿ.',
    deepQuestions: [
      'What happens if malloc() fails to allocate memory on the C heap?',
      'Why is node insertion in a Singly Linked List O(1) if given a pointer to the target node, but O(N) if searching by key value?'
    ],
    extensionMaterials: ['Valgrind C memory leak analyzer trace', 'Doubly vs Singly Linked List C code examples'],
    targetStudents: ['Vihaan Reddy', 'Ananya Iyer']
  },

  visualDiagram: {
    title: 'Singly Linked List Memory Layout & Node Pointer Reassignment',
    imageUrl: 'https://images.unsplash.com/photo-1516116211223-4c5917326c81?auto=format&fit=crop&w=1200&q=80',
    caption: 'RAM Heap node memory layout showing Head pointer 0x1004 pointing to Node 1, next pointer 0x100C pointing to Node 2, and trailing NULL pointer.',
    captionHindi: 'RAM हीप नोड मेमोरी लेआउट: हेड पॉइंटर (0x1004) -> नोड 1 (0x100C) -> नोड 2 -> NULL।',
    hotspots: [
      { label: 'Head Pointer (0x1004)', hindiLabel: 'हेड पॉइंटर (0x1004)', description: 'Points to the start memory address of the first node in RAM heap.', x: 15, y: 50 },
      { label: 'Data Field (int data)', hindiLabel: 'डेटा फ़ील्ड (int data)', description: 'Stores integer element value inside struct Node.', x: 45, y: 50 },
      { label: 'Next Pointer (*next)', hindiLabel: 'नेक्स्ट पॉइंटर (*next)', description: 'Holds RAM address of the successor node (0x100C).', x: 65, y: 50 },
      { label: 'NULL Pointer (0x0000)', hindiLabel: 'नल पॉइंटर (NULL)', description: 'End of list indicator (prevents segmentation fault crashes).', x: 88, y: 50 }
    ]
  },

  formativeQuiz: [
    {
      id: 'quiz-vtu-dsa-1',
      question: 'What is the time complexity to insert a new node at the head of a Singly Linked List of size N?',
      questionHindi: 'N आकार की सिंगली लिंक्ड लिस्ट के हेड में नया नोड जोड़ने की टाइम कॉम्प्लेक्सिटी क्या है?',
      questionKannada: 'N ಗಾತ್ರದ ಸಿಂಗಿಲಿ ಲಿಂಕ್ಡ್ ಲಿಸ್ಟ್‌ನ ಹೆಡ್‌ನಲ್ಲಿ ಹೊಸ ನೋಡ್ ಸೇರಿಸಲು ಸಮಯದ ಸಂಕೀರ್ಣತೆ ಎಷ್ಟು?',
      options: ['O(1)', 'O(N)', 'O(log N)', 'O(N²)'],
      optionsHindi: ['O(1)', 'O(N)', 'O(log N)', 'O(N²)'],
      optionsKannada: ['O(1)', 'O(N)', 'O(log N)', 'O(N²)'],
      correctAnswerIndex: 0,
      explanation: 'Inserting at head only requires creating the new node and updating two pointers: newNode->next = head; head = newNode. This takes constant O(1) time.',
      explanationHindi: 'हेड पर नोड इंसर्शन केवल 2 पॉइंटर असाइनमेंट लेता है, जो constant O(1) टाइम में होता है।',
      explanationKannada: 'ಹೆಡ್‌ನಲ್ಲಿ ಸೇರ್ಪಡೆ ಮಾಡುವುದು ಕೇವಲ 2 ಪಾಯಿಂಟರ್ ಬದಲಾವಣೆಯಾಗಿದೆ (O(1)).',
      targetedConcept: 'Node Insertion Time Complexity',
      difficulty: 'Easy'
    },
    {
      id: 'quiz-vtu-dsa-2',
      question: 'In C programming for VTU 1BCS305, which function dynamically allocates memory on the heap for a new struct Node?',
      questionHindi: 'VTU 1BCS305 में नया struct Node बनाने के लिए हीप पर मेमोरी आवंटित करने वाला C फ़ंक्शन कौन सा है?',
      questionKannada: 'ಹೊಸ struct Node ಗಾಗಿ ಮೆಮೊರಿಯನ್ನು ನಿಯೋಜಿಸುವ C ಫಂಕ್ಷನ್ ಯಾವುದು?',
      options: ['malloc(sizeof(struct Node))', 'free(node)', 'calloc(0)', 'realloc(node)'],
      optionsHindi: ['malloc(sizeof(struct Node))', 'free(node)', 'calloc(0)', 'realloc(node)'],
      optionsKannada: ['malloc(sizeof(struct Node))', 'free(node)', 'calloc(0)', 'realloc(node)'],
      correctAnswerIndex: 0,
      explanation: 'malloc() allocates contiguous bytes on the RAM heap equal to the size of struct Node and returns a pointer to it.',
      explanationHindi: 'malloc() हीप पर struct Node आकार की मेमोरी आवंटित करता है।',
      explanationKannada: 'malloc() ಮೆಮೊರಿಯನ್ನು ಹೀಪ್‌ನಲ್ಲಿ ನಿಯೋಜಿಸುತ್ತದೆ.',
      targetedConcept: 'Dynamic Memory Allocation (malloc)',
      difficulty: 'Medium'
    },
    {
      id: 'quiz-vtu-dsa-3',
      question: 'What happens if a Singly Linked List traversal does not check for `temp->next != NULL` before dereferencing `temp = temp->next`?',
      questionHindi: 'यदि सिंगली लिंक्ड लिस्ट ट्रैवर्सल में `temp->next != NULL` चेक नहीं किया जाए, तो क्या हो सकता है?',
      questionKannada: 'ಪಾಯಿಂಟರ್ NULL ಪರಿಶೀಲಿಸದಿದ್ದರೆ ಏನಾಗುತ್ತದೆ?',
      options: [
        'Segmentation Fault / Null Pointer Access Crash',
        'System automatically creates a new node',
        'Code runs faster without checks',
        'List automatically reverses itself'
      ],
      optionsHindi: [
        'सेगमेंटेशन फॉल्ट / नल पॉइंटर क्रैश',
        'सिस्टम नया नोड बना देता है',
        'कोड तेज़ी से चलता है',
        'लिस्ट अपने आप उलटी हो जाती है'
      ],
      optionsKannada: [
        'ಸೆಗ್ಮೆಂಟೇಷನ್ ಫಾಲ್ಟ್ (Segmentation Fault Crash)',
        'ಹೊಸ ನೋಡ್ ಸೃಷ್ಟಿಯಾಗುತ್ತದೆ',
        'ವೇಗವಾಗಿ ರನ್ ಆಗುತ್ತದೆ',
        'ರಿವರ್ಸ್ ಆಗುತ್ತದೆ'
      ],
      correctAnswerIndex: 0,
      explanation: 'Dereferencing a NULL pointer leads to illegal memory access resulting in a Segmentation Fault runtime crash.',
      explanationHindi: 'NULL पॉइंटर को डिरेफ़रेंस करने पर सेगमेंटेशन फॉल्ट क्रैश होता है।',
      explanationKannada: 'NULL ಪಾಯಿಂಟರ್ ಪ್ರವೇಶಿಸುವುದು ಸೆಗ್ಮೆಂಟೇಷನ್ ಫಾಲ್ಟ್ ಉಂಟುಮಾಡುತ್ತದೆ.',
      targetedConcept: 'Null Pointer Dereferencing Safety',
      difficulty: 'Hard'
    }
  ]
};

export const DEFAULT_PHOTOSYNTHESIS_LESSON_40MIN: LessonPlan = {
  id: 'lesson-photo-40',
  topic: 'Photosynthesis: The Plant Food Factory',
  topicHindi: 'प्रकाश संश्लेषण: पौधों का भोजन निर्माण',
  topicKannada: 'ದ್ಯುತಿಸಂಶ್ಲೇಷಣೆ: ಸಸ್ಯಗಳಲ್ಲಿ ಆಹಾರ ಉತ್ಪಾದನೆ',
  grade: 7,
  subject: 'Science / Biology',
  totalDurationMinutes: 40,
  targetExamDate: 'Next Tuesday (Oct 14, 2026)',
  languages: ['English', 'Hindi', 'Kannada'],
  predictedGapsCount: 3,
  highRiskStudents: ['Aarav Sharma', 'Priya Patel', 'Rohan Verma', 'Prajwal Gowda'],
  approvalState: 'draft',
  lastUpdated: 'Just now',
  
  sourcesUsed: [
    {
      sourceId: 'doc-ncert-2026',
      citation: 'NCERT Grade 7 Science Ch 1 (Pages 12–16)',
      reason: 'Primary verified curriculum ground truth for balanced photosynthesis equation and stomata.'
    },
    {
      sourceId: 'doc-curriculum-guideline',
      citation: 'Pedagogical Framework 2026 (Page 46)',
      reason: 'Guided bilingual Hindi-English scaffolding and formative checkpoint frequency.'
    }
  ],

  ignoredSources: [
    {
      sourceId: 'doc-notes-2021',
      reason: 'Ignored older 2021 note due to conflicting simplified formula and missing 2026 CBSE stoichiometry standards.'
    }
  ],

  beginnerExplanation: {
    summary: 'Plants don’t eat food with a mouth like us—they cook their own food using sunlight, air, and water inside their leaves!',
    summaryHindi: 'पौधे हमारी तरह मुंह से खाना नहीं खाते—वे अपनी पत्तियों में धूप, हवा और पानी का उपयोग करके अपना खाना खुद बनाते हैं!',
    summaryKannada: 'ಸಸ್ಯಗಳು ನಮ್ಮಂತೆ ಬಾಯಿಯಿಂದ ಆಹಾರ ತಿನ್ನುವುದಿಲ್ಲ—ಅವು ತಮ್ಮ ಎಲೆಗಳಲ್ಲಿ ಸೂರ್ಯನ ಬೆಳಕು, ಗಾಳಿ ಮತ್ತು ನೀರನ್ನು ಬಳಸಿ ಸ್ವತಃ ಆಹಾರವನ್ನು ತಯಾರಿಸುತ್ತವೆ!',
    keyAnalogy: 'The "Kitchen of the Leaf": Leaf = Kitchen, Sunlight = Stove Flame, Water (from roots) + CO2 (from air) = Raw Ingredients, Glucose = Delicious Cooked Meal, Oxygen = Fresh Breeze released!',
    keyAnalogyHindi: 'पत्ती की रसोई: पत्ती = किचन, सूरज की धूप = गैस का चूल्हा, पानी (जड़ों से) + कार्बन डाइऑक्साइड (हवा से) = कच्ची सामग्री, ग्लूकोज = पका हुआ भोजन, ऑक्सीजन = बाहर छोड़ी गई ताज़ी हवा!',
    keyAnalogyKannada: 'ಎಲೆಯ ಅಡುಗೆಮನೆ ರೂಪಕ (Leaf Kitchen): ಎಲೆ = ಅಡುಗೆ ಮನೆ, ಸೂರ್ಯನ ಬೆಳಕು = ಗ್ಯಾಸ್ ಸ್ಟೌವ್ ಶಾಖ, ನೀರು (ಬೇರುಗಳಿಂದ) + CO2 (ಗಾಳಿಯಿಂದ) = ಕಚ್ಚಾ ಸಾಮಗ್ರಿಗಳು, ಗ್ಲೂಕೋಸ್ = ತಯಾರಾದ ರುಚಿಕರ ಆಹಾರ, ಆಮ್ಲಜನಕ = ಹೊರಸೂಸುವ ತಾಜಾ ಗಾಳಿ!',
    visualCues: [
      'Leaf surface with green chloroplast solar panels',
      'Stomata acting like tiny breathing windows that open and close',
      'Roots acting like drinking straws sucking water upward'
    ],
    vocabularyGlossary: [
      { term: 'Photosynthesis', hindiTerm: 'प्रकाश संश्लेषण (Prakash Sanshleshan)', kannadaTerm: 'ದ್ಯುತಿಸಂಶ್ಲೇಷಣೆ (Dyutisamsleshane)', definition: 'Process where plants use light to make food' },
      { term: 'Chlorophyll', hindiTerm: 'पर्णहरित / क्लोरोफिल', kannadaTerm: 'ಪತ್ರಹರಿತ್ತು / ಕ್ಲೋರೋಫಿಲ್', definition: 'Green pigment that traps sunlight energy' },
      { term: 'Stomata', hindiTerm: 'रंध्र (Stomata)', kannadaTerm: 'ಪತ್ರರಂಧ್ರ (Stomata)', definition: 'Tiny pores on underside of leaves for gas exchange' },
      { term: 'Glucose', hindiTerm: 'ग्लूकोज (शर्करा)', kannadaTerm: 'ಗ್ಲೂಕೋಸ್ (ಶರ್ಕರಪಿಷ್ಟ)', definition: 'Simple sugar stored as energy/food by the plant' }
    ],
    targetStudents: ['Aarav Sharma', 'Priya Patel', 'Rohan Verma', 'Prajwal Gowda']
  },

  standardLesson: {
    objectives: [
      'Define photosynthesis and write the balanced chemical equation (6CO₂ + 6H₂O + Light → C₆H₁₂O₆ + 6O₂).',
      'Explain the role of Chlorophyll in absorbing solar photons.',
      'Demonstrate how Stomata regulate carbon dioxide intake and oxygen release.',
      'Correlate water transport via Xylem with raw material availability in leaves.'
    ],
    objectivesHindi: [
      'प्रकाश संश्लेषण को परिभाषित करें और संतुलित रासायनिक समीकरण लिखें।',
      'सौर ऊर्जा को अवशोषित करने में क्लोरोफिल की भूमिका समझाएं।',
      'रंध्र (स्टोमेटा) गैसों के आदान-प्रदान को कैसे नियंत्रित करते हैं, इसका प्रदर्शन करें।',
      'जाइलम (Xylem) द्वारा जल परिवहन का भोजन निर्माण से संबंध समझाइए।'
    ],
    objectivesKannada: [
      'ದ್ಯುತಿಸಂಶ್ಲೇಷಣೆಯನ್ನು ವ್ಯಾಖ್ಯಾನಿಸಿ ಮತ್ತು ಸಮತೋಲಿತ ರಾಸಾಯನಿಕ ಸಮೀಕರಣವನ್ನು ಬರೆಯಿರಿ (6CO₂ + 6H₂O + ಬೆಳಕು → C₆H₁₂O₆ + 6O₂).',
      'ಸೌರ ಶಕ್ತಿಯನ್ನು ಹೀರಿಕೊಳ್ಳುವಲ್ಲಿ ಕ್ಲೋರೋಫಿಲ್ (ಪತ್ರಹರಿತ್ತು) ಪಾತ್ರವನ್ನು ವಿವರಿಸಿ.',
      'ಪತ್ರರಂಧ್ರಗಳು (Stomata) ಇಂಗಾಲದ ಡೈಆಕ್ಸೈಡ್ ಮತ್ತು ಆಮ್ಲಜನಕದ ವಿನಿಮಯವನ್ನು ಹೇಗೆ ನಿಯಂತ್ರಿಸುತ್ತವೆ ಎಂಬುದನ್ನು ಪ್ರದರ್ಶಿಸಿ.',
      'ಕ್ಸೈಲಂ (Xylem) ಮೂಲಕ ನೀರಿನ ಸಾಗಾಣಿಕೆ ಮತ್ತು ಎಲೆಗಳಲ್ಲಿ ಆಹಾರ ತಯಾರಿಕೆಯ ಸಂಬಂಧವನ್ನು ತಿಳಿಸಿ.'
    ],
    sections: [
      {
        id: 'sec-1',
        timeAllocationMinutes: 5,
        title: 'The Hook: Mystery of the Green Solar Factory',
        titleHindi: 'शुरुआत: हरी सौर ऊर्जा फैक्ट्री का रहस्य',
        titleKannada: 'ಆರಂಭ: ಹಸಿರು ಸೌರ ಕಾರ್ಖಾನೆಯ ರಹಸ್ಯ',
        icon: 'Sparkles',
        teacherTalkingPoints: [
          '"Hold up a fresh green leaf. Ask: How does this tiny leaf create food for giant trees without shopping at a grocery store?"',
          '"Introduce the 3 essential raw materials: Sunlight, Water, and Carbon Dioxide."',
          '"Highlight today’s goal: We will unlock the recipe plants use to feed the entire planet."'
        ],
        teacherTalkingPointsHindi: [
          'हाथ में एक हरी पत्ती उठाएं और पूछें: यह नन्ही पत्ती बिना दुकान जाए पूरे पेड़ के लिए भोजन कैसे बनाती है?',
          'तीन मुख्य घटकों का परिचय दें: धूप, पानी और कार्बन डाइऑक्साइड।',
          'आज का लक्ष्य: पौधे पूरे ग्रह के लिए भोजन कैसे तैयार करते हैं, इस प्रक्रिया को समझना।'
        ],
        teacherTalkingPointsKannada: [
          'ಹಸಿರು ಎಲೆಯನ್ನು ತೋರಿಸಿ: ಈ ಪುಟ್ಟ ಎಲೆಯು ಅಂಗಡಿಗೆ ಹೋಗದೆ ಇಡೀ ಮರಕ್ಕೆ ಆಹಾರವನ್ನು ಹೇಗೆ ತಯಾರಿಸುತ್ತದೆ?',
          'ಮೂರು ಮುಖ್ಯ ಕಚ್ಚಾ ವಸ್ತುಗಳನ್ನು ಪರಿಚಯಿಸಿ: ಸೂರ್ಯನ ಬೆಳಕು, ನೀರು ಮತ್ತು ಇಂಗಾಲದ ಡೈಆಕ್ಸೈಡ್ (CO2).',
          'ಇಂದಿನ ಗುರಿ: ಸಸ್ಯಗಳು ಆಹಾರ ತಯಾರಿಸುವ ದ್ಯುತಿಸಂಶ್ಲೇಷಣೆ ರಹಸ್ಯವನ್ನು ಕಲಿಯುವುದು.'
        ],
        studentActivities: [
          'Touch and examine the texture of real leaves provided on classroom desks.',
          'Bilingual quick share: "Where do you think sunlight goes inside the leaf?"'
        ],
        scaffoldingTips: 'Ask Aarav and Rohan directly if they can name the green color pigment.',
        groundedInCitation: 'NCERT 2026, Ch. 1, p. 12'
      },
      {
        id: 'sec-2',
        timeAllocationMinutes: 12,
        title: 'Direct Instruction: The Photosynthesis Equation & Machinery',
        titleHindi: 'प्रत्यक्ष शिक्षण: प्रकाश संश्लेषण समीकरण और क्लोरोप्लास्ट',
        titleKannada: 'ಮುಖ್ಯ ಬೋಧನೆ: ದ್ಯುತಿಸಂಶ್ಲೇಷಣೆಯ ರಾಸಾಯನಿಕ ಸಮೀಕರಣ ಮತ್ತು ಕ್ಲೋರೋಪ್ಲಾಸ್ಟ್',
        icon: 'BookOpen',
        teacherTalkingPoints: [
          'Display the visual diagram: Trace Sunlight → Chloroplasts (Chlorophyll traps photons).',
          'Explain the chemical equation step-by-step: 6 molecules of Carbon Dioxide + 6 molecules of Water with Light Energy yields 1 Glucose + 6 Oxygen.',
          'Point out Stomata under microscopic magnification on the interactive screen.',
          'Explain guard cells: Turgid = Stomata open (absorb CO₂); Flaccid = Closed (save water).'
        ],
        teacherTalkingPointsHindi: [
          'रासायनिक समीकरण को बोर्ड पर लिखें: 6CO₂ + 6H₂O + प्रकाश ऊर्जा → C₆H₁₂O₆ + 6O₂',
          'क्लोरोफिल का कार्य: सूर्य के प्रकाश की ऊर्जा को पकड़ना।',
          'रंध्र (स्टोमेटा) के रक्षक कोशिकाएं (Guard cells) कैसे खुलती और बंद होती हैं।'
        ],
        teacherTalkingPointsKannada: [
          'ರಾಸಾಯನಿಕ ಸಮೀಕರಣವನ್ನು ಬರೆಯಿರಿ: 6CO₂ + 6H₂O + ಸೂರ್ಯನ ಬೆಳಕು → C₆H₁₂O₆ (ಗ್ಲೂಕೋಸ್) + 6O₂ (ಆಮ್ಲಜನಕ).',
          'ಕ್ಲೋರೋಫಿಲ್ ಸೂರ್ಯನ ಫೋಟಾನ್ ಬೆಳಕಿನ ಶಕ್ತಿಯನ್ನು ಹೀರಿಕೊಳ್ಳುತ್ತದೆ.',
          'ಪತ್ರರಂಧ್ರಗಳು (Stomata) ಮತ್ತು ಕಾವಲು ಜೀವಕೋಶಗಳು (Guard cells) ಅನಿಲ ವಿನಿಮಯವನ್ನು ನಿಯಂತ್ರಿಸುತ್ತವೆ.'
        ],
        studentActivities: [
          'Students copy the color-coded equation into notebooks (CO₂ = Grey, H₂O = Blue, Light = Yellow, Glucose = Green, O₂ = Orange).',
          'Hand gesture demonstration: Mimic open/closed guard cells with palms.'
        ],
        scaffoldingTips: 'Display the Hindi glossary keywords on the sidebar for Priya and Aarav.',
        groundedInCitation: 'NCERT 2026, Ch. 1, pp. 13-14'
      },
      {
        id: 'sec-3',
        timeAllocationMinutes: 10,
        title: 'Guided Practice: The Starch & Sunlight Investigation',
        titleHindi: 'निर्देशित अभ्यास: स्टार्च और सूर्य के प्रकाश का परीक्षण',
        titleKannada: 'ಮಾರ್ಗದರ್ಶಿತ ಪ್ರಯೋಗ: ಪಿಷ್ಟ (Starch) ಮತ್ತು ಸೂರ್ಯನ ಬೆಳಕಿನ ಅಯೋಡಿನ್ ಪರೀಕ್ಷೆ',
        icon: 'FlaskConical',
        teacherTalkingPoints: [
          'Explain the Iodine Starch Test: Boiled leaf + Iodine solution turns blue-black where photosynthesis occurred.',
          'Ask the class: "If a leaf is kept in dark for 72 hours, what color will iodine turn? Why?"',
          'Address common misconception: Plants do NOT photosynthesize at midnight without light!'
        ],
        teacherTalkingPointsHindi: [
          'आयोडीन स्टार्च परीक्षण: उबली हुई पत्ती पर आयोडीन डालने पर स्टार्च होने पर वह नीला-काला (Blue-Black) हो जाता है।',
          'कक्षा से पूछें: अगर पत्ती को 3 दिन अंधेरे में रखा जाए तो क्या होगा?'
        ],
        teacherTalkingPointsKannada: [
          'ಅಯೋಡಿನ್ ಪಿಷ್ಟ ಪರೀಕ್ಷೆ: ಎಲೆಯ ಮೇಲೆ ಅಯೋಡಿನ್ ದ್ರಾವಣ ಹಾಕಿದಾಗ ಪಿಷ್ಟವಿದ್ದರೆ ಅದು ನೀಲಿ-ಕಪ್ಪು ಬಣ್ಣಕ್ಕೆ ತಿರುಗುತ್ತದೆ.',
          'ಕತ್ತಲೆಯಲ್ಲಿ 72 ಗಂಟೆಗಳ ಕಾಲ ಇಟ್ಟ ಎಲೆಯಲ್ಲಿ ಆಹಾರ ತಯಾರಾಗುವುದಿಲ್ಲ, ಆದ್ದರಿಂದ ಬಣ್ಣ ಬದಲಾಗುವುದಿಲ್ಲ.'
        ],
        studentActivities: [
          'Paired diagram analysis: Label the inputs and outputs on the provided worksheet.',
          'Predict the result of covering half a leaf with black paper.'
        ],
        scaffoldingTips: 'Check Rohan and Priya’s worksheets first to ensure they correctly identified Oxygen as the released product.',
        groundedInCitation: 'NCERT 2026, Ch. 1, p. 15'
      },
      {
        id: 'sec-4',
        timeAllocationMinutes: 8,
        title: 'Formative AI Checkpoint: Quick Diagnostic Quiz',
        titleHindi: 'रचनात्मक मूल्यांकन: त्वरित 3-प्रश्न क्विज़',
        titleKannada: 'ರಚನಾತ್ಮಕ ಮೌಲ್ಯಮಾಪನ: 3 ತ್ವರಿತ ರಸಪ್ರಶ್ನೆ ಪ್ರಶ್ನೆಗಳು',
        icon: 'HelpCircle',
        teacherTalkingPoints: [
          'Administer the 3-question quick quiz on student tablet/paper.',
          'Review real-time learner response telemetry to catch residual misconceptions before next week’s exam.'
        ],
        teacherTalkingPointsHindi: [
          '3-प्रश्नों की त्वरित क्विज़ हल कराएं और तुरंत फीडबैक दें।'
        ],
        teacherTalkingPointsKannada: [
          'ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ 3 ಪ್ರಶ್ನೆಗಳ ತ್ವರಿತ ರಸಪ್ರಶ್ನೆಯನ್ನು ನಡೆಸಿ ತಕ್ಷಣದ ಪ್ರತಿಕ್ರಿಯೆ ನೀಡಿ.'
        ],
        studentActivities: [
          'Solve the 3 interactive formative questions.',
          'Discuss question 2 (role of stomata) in pairs.'
        ],
        scaffoldingTips: 'Offer Hindi prompt voice read-out for bilingual students.',
        groundedInCitation: 'CBSE Pedagogical Framework 2026, p. 47'
      },
      {
        id: 'sec-5',
        timeAllocationMinutes: 5,
        title: 'Synthesis & Differentiated Wrap-Up',
        titleHindi: 'निष्कर्ष और स्तर-अनुसार गृहकार्य',
        titleKannada: 'ಉಪಸಂಹಾರ ಮತ್ತು ವಿಭಿನ್ನ ಮನೆಕೆಲಸ',
        icon: 'CheckCircle2',
        teacherTalkingPoints: [
          'Summarize: Without photosynthesis, Earth would have no oxygen and no food chain.',
          'Assign Tiered Homework: Standard gets worksheet; Advanced gets Calvin Cycle research; Beginners get "Plant Kitchen" comic strip.'
        ],
        teacherTalkingPointsHindi: [
          'सारांश: प्रकाश संश्लेषण के बिना पृथ्वी पर जीवन संभव नहीं है।',
          'सभी छात्रों को उनके स्तर के अनुसार कार्य सौंपें।'
        ],
        teacherTalkingPointsKannada: [
          'ಸಾರಾಂಶ: ದ್ಯುತಿಸಂಶ್ಲೇಷಣೆ ಇಲ್ಲದೆ ಭೂಮಿಯ ಮೇಲೆ ಆಮ್ಲಜನಕ ಮತ್ತು ಜೀವಿಗಳು ಉಳಿಯಲು ಸಾಧ್ಯವಿಲ್ಲ.',
          'ಮಟ್ಟಕ್ಕೆ ತಕ್ಕಂತೆ ಮನೆಕೆಲಸವನ್ನು ನೀಡಿ.'
        ],
        studentActivities: [
          '30-second exit ticket: Whisper to your partner the name of the gas released.'
        ],
        groundedInCitation: 'NCERT 2026, Ch. 1, p. 16'
      }
    ]
  },

  advancedActivity: {
    title: 'Advanced Inquiry Challenge: The Photobiology & Calvin Cycle Explorer',
    titleHindi: 'उच्च स्तरीय खोज चुनौती: प्रकाश तीव्रता और प्रकाश संश्लेषण दर',
    inquiryChallenge: 'Investigate how differing wavelengths of light (Red vs Blue vs Green) and varying concentrations of atmospheric CO₂ affect the rate of oxygen bubble emission in underwater Hydrilla plants.',
    inquiryChallengeHindi: 'हाइड्रिला पौधे में प्रकाश के विभिन्न रंगों (लाल, नीला, हरा) और CO₂ की सांद्रता का ऑक्सीजन उत्सर्जन की गति पर प्रभाव मापें।',
    deepQuestions: [
      'Why do green leaves reflect green light and absorb red/blue light photons?',
      'If global temperatures rise above 45°C, why does the rate of photosynthesis drop drastically despite excess sunlight?',
      'How do desert C4/CAM plants keep stomata closed during blistering daylight without starving for CO₂?'
    ],
    extensionMaterials: [
      'Hydrilla sprig water bath apparatus guide',
      'Light spectrum filter color sheets',
      'Dissolved oxygen sensor simulation'
    ],
    targetStudents: ['Vihaan Reddy', 'Ananya Iyer']
  },

  visualDiagram: {
    title: 'Photosynthesis: The Plant’s Food Factory (Interactive High-Res Architecture)',
    imageUrl: '/assets/photosynthesis.jpg',
    caption: 'Cross-section of leaf showing cuticle, mesophyll cells, stomata gas exchange pores, chloroplast thylakoid stacks, and xylem/phloem vascular transport.',
    captionHindi: 'पत्ती की आंतरिक संरचना: क्यूटिकल, मेसोफिल कोशिकाएं, रंध्र, क्लोरोप्लास्ट और संवहनी बंडल (जाइलम/फ्लोएम)।',
    hotspots: [
      {
        label: 'Sunlight & Photons',
        hindiLabel: 'सूर्य का प्रकाश',
        description: 'Radiant solar energy absorbed by chlorophyll pigments in thylakoids.',
        x: 18,
        y: 16
      },
      {
        label: 'Stomata (Pores)',
        hindiLabel: 'रंध्र (स्टोमेटा)',
        description: 'Microscopic pores regulated by guard cells. Takes in CO₂ and releases O₂.',
        x: 12,
        y: 72
      },
      {
        label: 'Chloroplast Organelle',
        hindiLabel: 'क्लोरोप्लास्ट',
        description: 'The solar kitchen organelle containing green chlorophyll and Calvin cycle enzymes.',
        x: 74,
        y: 42
      },
      {
        label: 'Xylem Vessels (Roots)',
        hindiLabel: 'जाइलम (जल संवहन)',
        description: 'Draws water (H₂O) and minerals from roots upward through capillary action.',
        x: 48,
        y: 78
      },
      {
        label: 'Glucose & Oxygen Output',
        hindiLabel: 'ग्लूकोज और ऑक्सीजन उत्पाद',
        description: 'Synthesizes sugar (C₆H₁₂O₆) for energy and releases pure Oxygen (O₂) into the atmosphere.',
        x: 88,
        y: 52
      }
    ]
  },

  formativeQuiz: [
    {
      id: 'q-1',
      question: 'Which gas is taken in by green leaves through stomata during daytime photosynthesis?',
      questionHindi: 'दिन के समय प्रकाश संश्लेषण के दौरान पत्तियों द्वारा रंध्रों से कौन सी गैस अंदर ली जाती है?',
      questionKannada: 'ಹಗಲಿನ ವೇಳೆಯಲ್ಲಿ ದ್ಯುತಿಸಂಶ್ಲೇಷಣೆಯ ಸಮಯದಲ್ಲಿ ಹಸಿರು ಎಲೆಗಳು ಪತ್ರರಂಧ್ರಗಳ ಮೂಲಕ ಯಾವ ಅನಿಲವನ್ನು ಒಳಗೆ ತೆಗೆದುಕೊಳ್ಳುತ್ತವೆ?',
      options: ['Oxygen (O₂)', 'Carbon Dioxide (CO₂)', 'Nitrogen (N₂)', 'Hydrogen (H₂)'],
      optionsHindi: ['ऑक्सीजन (O₂)', 'कार्बन डाइऑक्साइड (CO₂)', 'नाइट्रोजन (N₂)', 'हाइड्रोजन (H₂)'],
      optionsKannada: ['ಆಮ್ಲಜನಕ (Oxygen - O₂)', 'ಇಂಗಾಲದ ಡೈಆಕ್ಸೈಡ್ (Carbon Dioxide - CO₂)', 'ಸಾರಜನಕ (Nitrogen - N₂)', 'ಜಲಜನಕ (Hydrogen - H₂)'],
      correctAnswerIndex: 1,
      explanation: 'Carbon dioxide is absorbed through stomata pores and combined with water to create glucose.',
      explanationHindi: 'कार्बन डाइऑक्साइड पत्तियों के रंध्रों से अवशोषित होती है और पानी के साथ मिलकर ग्लूकोज बनाती है।',
      explanationKannada: 'ಇಂಗಾಲದ ಡೈಆಕ್ಸೈಡ್ (CO2) ಅನ್ನು ಪತ್ರರಂಧ್ರಗಳ ಮೂಲಕ ಹೀರಿಕೊಳ್ಳಲಾಗುತ್ತದೆ ಮತ್ತು ನೀರಿನೊಂದಿಗೆ ಸಂಯೋಜಿಸಿ ಗ್ಲೂಕೋಸ್ ತಯಾರಿಸಲಾಗುತ್ತದೆ.',
      targetedConcept: 'Stomata Gas Exchange',
      difficulty: 'Easy'
    },
    {
      id: 'q-2',
      question: 'What is the primary role of Chlorophyll in the leaf chloroplasts?',
      questionHindi: 'पत्ती के क्लोरोप्लास्ट में क्लोरोफिल (पर्णहरित) का मुख्य कार्य क्या है?',
      questionKannada: 'ಎಲೆಯ ಕ್ಲೋರೋಪ್ಲಾಸ್ಟ್‌ಗಳಲ್ಲಿ ಕ್ಲೋರೋಫಿಲ್ (ಪತ್ರಹರಿತ್ತು) ನ ಪ್ರಮುಖ ಪಾತ್ರವೇನು?',
      options: [
        'To absorb water from the soil',
        'To trap solar light energy',
        'To release carbon dioxide into the air',
        'To protect the plant from insects'
      ],
      optionsHindi: [
        'मिट्टी से पानी सोखना',
        'सूर्य के प्रकाश की ऊर्जा को अवशोषित करना',
        'हवा में कार्बन डाइऑक्साइड छोड़ना',
        'पौधे को कीड़ों से बचाना'
      ],
      optionsKannada: [
        'ಮಣ್ಣಿನಿಂದ ನೀರನ್ನು ಹೀರಿಕೊಳ್ಳುವುದು',
        'ಸೌರ ಬೆಳಕಿನ ಶಕ್ತಿಯನ್ನು ಹಿಡಿದಿಟ್ಟುಕೊಳ್ಳುವುದು (ಹೀರಿಕೊಳ್ಳುವುದು)',
        'ಗಾಳಿಗೆ ಇಂಗಾಲದ ಡೈಆಕ್ಸೈಡ್ ಬಿಡುಗಡೆ ಮಾಡುವುದು',
        'ಸಸ್ಯವನ್ನು ಕೀಟಗಳಿಂದ ರಕ್ಷಿಸುವುದು'
      ],
      correctAnswerIndex: 1,
      explanation: 'Chlorophyll acts as a solar absorber, capturing sunlight energy to drive the chemical reaction.',
      explanationHindi: 'क्लोरोफिल एक सौर पैनल की तरह काम करता है, जो रासायनिक क्रिया को चलाने के लिए सूर्य के प्रकाश को पकड़ता है।',
      explanationKannada: 'ಕ್ಲೋರೋಫಿಲ್ ಸೌರ ಫಲಕದಂತೆ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತದೆ, ರಾಸಾಯನಿಕ ಕ್ರಿಯೆಯನ್ನು ನಡೆಸಲು ಸೂರ್ಯನ ಬೆಳಕನ್ನು ಸೆರೆಹಿಡಿಯುತ್ತದೆ.',
      targetedConcept: 'Chloroplast Function',
      difficulty: 'Medium'
    },
    {
      id: 'q-3',
      question: 'In the balanced photosynthesis equation (6CO₂ + 6H₂O + Light → ? + 6O₂), what is the primary product represented by "?"?',
      questionHindi: 'संतुलित समीकरण (6CO₂ + 6H₂O + प्रकाश → ? + 6O₂) में "?" किस मुख्य उत्पाद को दर्शाता है?',
      questionKannada: 'ಸಮತೋಲಿತ ಸಮೀಕರಣದಲ್ಲಿ (6CO₂ + 6H₂O + ಬೆಳಕು → ? + 6O₂), "?" ಗುರುತಿಸಲಾದ ಮುಖ್ಯ ಉತ್ಪನ್ನ ಯಾವುದು?',
      options: ['Glucose (C₆H₁₂O₆)', 'Methane (CH₄)', 'Calcium Carbonate (CaCO₃)', 'Hydrochloric Acid (HCl)'],
      optionsHindi: ['ग्लूकोज (C₆H₁₂O₆)', 'मीथेन (CH₄)', 'कैल्शियम कार्बोनेट (CaCO₃)', 'हाइड्रोक्लोरिक एसिड (HCl)'],
      optionsKannada: ['ಗ್ಲೂಕೋಸ್ (Glucose - C₆H₁₂O₆)', 'ಮೀಥೇನ್ (Methane - CH₄)', 'ಕ್ಯಾಲ್ಸಿಯಂ ಕಾರ್ಬೋನೇಟ್ (CaCO₃)', 'ಹೈಡ್ರೋಕ್ಲೋರಿಕ್ ಆಮ್ಲ (HCl)'],
      correctAnswerIndex: 0,
      explanation: 'Glucose (C₆H₁₂O₆) is the energy-rich sugar manufactured by the plant.',
      explanationHindi: 'ग्लूकोज (C₆H₁₂O₆) वह शर्करा (भोजन) है जो पौधे द्वारा ऊर्जा के लिए बनाई जाती है।',
      explanationKannada: 'ಗ್ಲೂಕೋಸ್ (C₆H₁₂O₆) ಎಂಬುದು ಸಸ್ಯಗಳು ಶಕ್ತಿಗಾಗಿ ತಯಾರಿಸುವ ಸಕ್ಕರೆಯುಕ್ತ ಆಹಾರ ಉತ್ಪನ್ನವಾಗಿದೆ.',
      targetedConcept: 'Chemical Equation Balancing',
      difficulty: 'Medium'
    }
  ]
};

// 20-Minute Compressed Replanned Version (Triggered when teacher says "The class is behind; reduce this to 20 minutes")
export const REPLANNED_PHOTOSYNTHESIS_LESSON_20MIN: LessonPlan = {
  ...DEFAULT_PHOTOSYNTHESIS_LESSON_40MIN,
  id: 'lesson-photo-20-replanned',
  totalDurationMinutes: 20,
  isReplanned: true,
  replannedReason: 'Dynamic Voice Command: "The class is behind; reduce this to 20 minutes." Agent compressed timeline by merging Hook with Direct Instruction, replacing extended lab with focused visual diagram walk-through, and preserving all high-risk learner scaffolds.',
  approvalState: 'reviewing',
  lastUpdated: 'Just now (Replanned)',
  standardLesson: {
    ...DEFAULT_PHOTOSYNTHESIS_LESSON_40MIN.standardLesson,
    sections: [
      {
        id: 'sec-replan-1',
        timeAllocationMinutes: 3,
        title: 'Fast Hook & Essential Question',
        titleHindi: 'त्वरित शुरुआत और मुख्य प्रश्न',
        icon: 'Zap',
        teacherTalkingPoints: [
          '"Show visual diagram immediately: How do plants make food from thin air and sunlight?"',
          '"State core objective: Today we master the 3 ingredients and the balanced equation."'
        ],
        teacherTalkingPointsHindi: [
          'सीधे विजुअल डायग्राम दिखाएं और 3 मुख्य घटक बताएं।'
        ],
        studentActivities: [
          'Look at the interactive leaf diagram on screen.'
        ],
        scaffoldingTips: 'Directly address Aarav and Priya with Hindi terms: Sunlight (धूप), Water (पानी), CO2 (हवा).',
        groundedInCitation: 'NCERT 2026, Ch. 1, p. 12'
      },
      {
        id: 'sec-replan-2',
        timeAllocationMinutes: 8,
        title: 'Core Direct Teaching: Equation & Chloroplast Diagram',
        titleHindi: 'मुख्य शिक्षण: समीकरण और क्लोरोप्लास्ट संरचना',
        icon: 'BookOpen',
        teacherTalkingPoints: [
          'Focus directly on the balanced formula: 6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂.',
          'Highlight Stomata guard cells (gas intake) and Chlorophyll (light capture).'
        ],
        teacherTalkingPointsHindi: [
          'संतुलित रासायनिक समीकरण पर ध्यान दें: 6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂',
          'रंध्र और क्लोरोफिल की भूमिका स्पष्ट करें।'
        ],
        studentActivities: [
          'Quick 1-minute write: Write the balanced formula once in notebook.'
        ],
        scaffoldingTips: 'Use the simplified "Plant Kitchen" analogy for students needing support.',
        groundedInCitation: 'NCERT 2026, Ch. 1, pp. 13-14'
      },
      {
        id: 'sec-replan-3',
        timeAllocationMinutes: 6,
        title: 'Rapid Formative Assessment (2 Questions)',
        titleHindi: 'त्वरित 2-प्रश्न मूल्यांकन',
        icon: 'HelpCircle',
        teacherTalkingPoints: [
          'Run the 2 highest priority diagnostic questions.',
          'Confirm that Aarav, Priya, and Rohan correctly identify CO2 as input and O2 as output.'
        ],
        teacherTalkingPointsHindi: [
          '2 महत्वपूर्ण प्रश्नों के माध्यम से छात्रों की समझ की तुरंत जांच करें।'
        ],
        studentActivities: [
          'Thumbs up / thumbs down rapid response to concept check.'
        ],
        scaffoldingTips: 'Provide immediate peer assistance.',
        groundedInCitation: 'CBSE Guideline 2026, p. 47'
      },
      {
        id: 'sec-replan-4',
        timeAllocationMinutes: 3,
        title: 'Speed Wrap-up & Remedial Assignment',
        titleHindi: 'त्वरित समापन और गृहकार्य',
        icon: 'CheckCircle2',
        teacherTalkingPoints: [
          '"Deliver key takeaway: Leaves convert light into glucose and give us oxygen to breathe."',
          '"Hand out bilingual flashcard summary for next week’s exam."'
        ],
        teacherTalkingPointsHindi: [
          'महत्वपूर्ण सारांश दोहराएं और परीक्षा के लिए फ्लैशकार्ड प्रदान करें।'
        ],
        studentActivities: [
          'Collect bilingual summary sheet.'
        ],
        groundedInCitation: 'NCERT 2026, Ch. 1, p. 16'
      }
    ]
  }
};

export const DEFAULT_CN_LESSON_30MIN: LessonPlan = {
  id: 'lesson-cn-tcp-30',
  topic: 'Computer Networks: TCP Congestion Control & Flow Control',
  topicHindi: 'कंप्यूटर नेटवर्क: टीसीपी फ्लो कंट्रोल और कंजेशन नियंत्रण',
  topicKannada: 'ಕಂಪ್ಯೂಟರ್ ನೆಟ್‌ವರ್ಕ್‌ಗಳು: ಟಿಸಿಪಿ ಹರಿವು ಮತ್ತು ದಟ್ಟಣೆ ನಿಯಂತ್ರಣ',
  grade: 11,
  subject: 'Computer Networks (CN) / CSE',
  totalDurationMinutes: 30,
  targetExamDate: 'Next Friday (Oct 17, 2026)',
  languages: ['English', 'Hindi', 'Kannada'],
  predictedGapsCount: 2,
  highRiskStudents: ['Rahul Sharma', 'Rohan Verma'],
  approvalState: 'draft',
  lastUpdated: 'Just now (Generated from Teacher Voice Intent)',
  
  sourcesUsed: [
    {
      sourceId: 'doc-cn-tanenbaum',
      citation: 'Computer Networks (Tanenbaum & Wetherall 6th Ed, Ch 6: Transport Layer)',
      reason: 'Primary verified academic ground truth for TCP sliding window, Slow Start exponential growth, and AIMD.'
    },
    {
      sourceId: 'doc-curriculum-guideline',
      citation: 'BTech / CBSE CSE Pedagogical Framework 2026',
      reason: 'Guided visual packet animation, bilingual terminology, and formative 2-minute checkpoint cadence.'
    }
  ],
  ignoredSources: [],

  beginnerExplanation: {
    summary: 'TCP is like a smart postman who tests how fast the road can carry letters without dropping any parcel along the way!',
    summaryHindi: 'टीसीपी एक समझदार डाकिया की तरह है जो पहले एक पैकेट भेजकर देखता है कि रास्ता साफ है या नहीं, फिर धीरे-धीरे पैकेट की संख्या बढ़ाता है!',
    summaryKannada: 'ಟಿಸಿಪಿ ಒಬ್ಬ ಬುದ್ಧಿವಂತ ಅಂಚೆಯಣ್ಣನಂತೆ, ರಸ್ತೆಯಲ್ಲಿ ಯಾವುದೇ ಪಾರ್ಸೆಲ್ ಬೀಳದಂತೆ ಎಷ್ಟು ವೇಗವಾಗಿ ಕಳುಹಿಸಬಹುದು ಎಂದು ಪರೀಕ್ಷಿಸುತ್ತದೆ!',
    keyAnalogy: 'The "Water Pipe & Funnel": Sender = Water Tap, Receiver Buffer = Funnel, Network Bandwidth = Pipe Width. If water enters faster than funnel drains → Overflow (Packet Loss)! Slow Start doubles water flow each round until a drop falls.',
    keyAnalogyHindi: 'पानी का पाइप और कीप (Funnel): भेजने वाला = नल, रिसीवर बफर = कीप, नेटवर्क = पाइप। अगर कीप भरने लगे तो फ्लो कंट्रोल नल को धीमा कर देता है!',
    keyAnalogyKannada: 'ನೀರಿನ ಪೈಪ್ ಮತ್ತು ಆಲಿಕೆ (Funnel): ಕಳುಹಿಸುವವನು = ನಲ್ಲಿ, ರಿಸೀವರ್ = ಆಲಿಕೆ. ನೀರು ಹೆಚ್ಚಾದರೆ ಸೋರಿಕೆ ಉಂಟಾಗುತ್ತದೆ (Packet Loss)!',
    visualCues: [
      'Sliding Window sliding forward across byte stream',
      'Exponential Slow Start curve (1 → 2 → 4 → 8 MSS) doubling per RTT',
      'Receiver Window (rwnd) advertising remaining buffer space'
    ],
    vocabularyGlossary: [
      { term: 'Flow Control', hindiTerm: 'फ्लो कंट्रोल (रिसीवर सुरक्षा)', kannadaTerm: 'ಹರಿವು ನಿಯಂತ್ರಣ', definition: 'Prevents fast sender from overwhelming slow receiver buffer (rwnd).' },
      { term: 'Congestion Control', hindiTerm: 'कंजेशन कंट्रोल (नेटवर्क सुरक्षा)', kannadaTerm: 'ದಟ್ಟಣೆ ನಿಯಂತ್ರಣ', definition: 'Prevents all senders from overwhelming the intermediate router network (cwnd).' },
      { term: 'Slow Start', hindiTerm: 'स्लो स्टार्ट (घातीय वृद्धि)', kannadaTerm: 'ಸ್ಲೋ ಸ್ಟಾರ್ಟ್', definition: 'Algorithm starting at 1 MSS and doubling congestion window every RTT.' },
      { term: 'AIMD', hindiTerm: 'एडिटिव इंक्रीज मल्टीप्लिकेटिव डिक्रीज', kannadaTerm: 'ಎಐಎಂಡಿ', definition: 'Increases linearly by 1 MSS upon ACK, cuts window in half upon loss.' }
    ],
    targetStudents: ['Rahul Sharma', 'Rohan Verma']
  },

  standardLesson: {
    objectives: [
      'Distinguish between Flow Control (Receiver Buffer rwnd) and Congestion Control (Network Pipe cwnd).',
      'Calculate window expansion during TCP Slow Start (Exponential) vs Congestion Avoidance (Linear).',
      'Explain Fast Retransmit and Fast Recovery upon 3 duplicate ACKs.'
    ],
    objectivesHindi: [
      'फ्लो कंट्रोल (rwnd) और कंजेशन कंट्रोल (cwnd) के बीच स्पष्ट अंतर समझें।',
      'स्लो स्टार्ट और कंजेशन अवॉइडेंस में विंडो ग्रोथ की गणना करें।',
      '3 डुप्लिकेट ACK मिलने पर फास्ट रीट्रांसमिट की कार्यप्रणाली समझाइए।'
    ],
    objectivesKannada: [
      'ಹರಿವು ನಿಯಂತ್ರಣ (rwnd) ಮತ್ತು ದಟ್ಟಣೆ ನಿಯಂತ್ರಣ (cwnd) ನಡುವಿನ ವ್ಯತ್ಯಾಸವನ್ನು ತಿಳಿಯಿರಿ.',
      'ಟಿಸಿಪಿ ಸ್ಲೋ ಸ್ಟಾರ್ಟ್ ಮತ್ತು ದಟ್ಟಣೆ ತಪ್ಪಿಸುವ ಹಂತಗಳಲ್ಲಿ ವಿಂಡೋ ಬೆಳವಣಿಗೆಯನ್ನು ಲೆಕ್ಕಹಾಕಿ.',
      '3 ನಕಲಿ ACK ಗಳಲ್ಲಿ ಫಾಸ್ಟ್ ರಿಟ್ರಾನ್ಸ್‌ಮಿಷನ್ ಕಾರ್ಯವಿಧಾನವನ್ನು ವಿವರಿಸಿ.'
    ],
    sections: [
      {
        id: 'sec-cn-1',
        timeAllocationMinutes: 4,
        title: 'The Hook: Why do Videos Buffer and Packets Drop?',
        titleHindi: 'शुरुआत: वीडियो बफर क्यों होता है और पैकेट्स कैसे ड्रॉप होते हैं?',
        titleKannada: 'ಆರಂಭ: ವೀಡಿಯೊಗಳು ಏಕೆ ಬಫರ್ ಆಗುತ್ತವೆ ಮತ್ತು ಪ್ಯಾಕೆಟ್‌ಗಳು ಹೇಗೆ ಕಳೆದುಹೋಗುತ್ತವೆ?',
        icon: 'Sparkles',
        teacherTalkingPoints: [
          '"Ask the class: When 100 students connect to campus Wi-Fi simultaneously to stream video, what stops the internet router from exploding with traffic?"',
          '"Introduce the twin guardians of TCP: Flow Control (protecting receiver) vs Congestion Control (protecting internet backbone)."'
        ],
        teacherTalkingPointsHindi: [
          'कक्षा से पूछें: जब 100 लोग एक साथ वाई-फाई से वीडियो चलाते हैं तो राउटर कैसे संभालता है?',
          'टीसीपी के दो रक्षकों का परिचय दें: फ्लो कंट्रोल और कंजेशन कंट्रोल।'
        ],
        teacherTalkingPointsKannada: [
          'ಒಂದೇ ಸಮಯದಲ್ಲಿ 100 ವಿದ್ಯಾರ್ಥಿಗಳು ವೈಫೈಗೆ ಸಂಪರ್ಕಿಸಿದಾಗ ನೆಟ್‌ವರ್ಕ್ ಟ್ರಾಫಿಕ್ ಅನ್ನು ಹೇಗೆ ನಿರ್ವಹಿಸಲಾಗುತ್ತದೆ?',
          'ಟಿಸಿಪಿಯ ಎರಡು ರಕ್ಷಕರನ್ನು ಪರಿಚಯಿಸಿ: ಹರಿವು ನಿಯಂತ್ರಣ ಮತ್ತು ದಟ್ಟಣೆ ನಿಯಂತ್ರಣ.'
        ],
        studentActivities: [
          'Live poll: "Who has experienced sudden video quality drops during peak hours?"'
        ],
        scaffoldingTips: 'Ask Rahul directly: "What happens if a sender pours data into a full phone storage?"',
        groundedInCitation: 'Tanenbaum Ch 6, p. 542'
      },
      {
        id: 'sec-cn-2',
        timeAllocationMinutes: 10,
        title: 'Core Direct Instruction: TCP Slow Start & Congestion Avoidance',
        titleHindi: 'मुख्य शिक्षण: स्लो स्टार्ट और कंजेशन अवॉइडेंस गणित',
        titleKannada: 'ಮುಖ್ಯ ಬೋಧನೆ: ಟಿಸಿಪಿ ಸ್ಲೋ ಸ್ಟಾರ್ಟ್ ಮತ್ತು ದಟ್ಟಣೆ ತಪ್ಪಿಸುವ ಅಲ್ಗಾರಿದಮ್',
        icon: 'BookOpen',
        teacherTalkingPoints: [
          'Draw the Congestion Window curve: cwnd starts at 1 MSS (Maximum Segment Size).',
          'Every round-trip time (RTT), cwnd doubles: 1 → 2 → 4 → 8 → 16 (Exponential Phase).',
          'When cwnd reaches Slow-Start Threshold (ssthresh), switch to Linear Growth: cwnd = cwnd + 1 per RTT.',
          'Upon Packet Loss: Drop ssthresh to cwnd / 2 and reset cwnd to 1 MSS (Tahoe) or cut in half (Reno).'
        ],
        teacherTalkingPointsHindi: [
          'बोर्ड पर कर्व बनाएं: स्लो स्टार्ट में विंडो हर राउंड में दोगुनी (1→2→4→8) होती है।',
          'थ्रेसहोल्ड (ssthresh) पर पहुंचने के बाद यह लीनियर (+1) हो जाती है।'
        ],
        teacherTalkingPointsKannada: [
          'ವಿಂಡೋ ಬೆಳವಣಿಗೆಯ ಗ್ರಾಫ್ ರಚಿಸಿ: ಪ್ರತಿ RTT ನಲ್ಲಿ ವಿಂಡೋ ದ್ವಿಗುಣಗೊಳ್ಳುತ್ತದೆ (1→2→4→8).',
          'ಮಿತಿ ತಲುಪಿದ ನಂತರ ಅದು ರೇಖೀಯವಾಗಿ (+1) ಬೆಳೆಯುತ್ತದೆ.'
        ],
        studentActivities: [
          'Calculate cwnd size for RTT 1, 2, 3, 4 given ssthresh = 16 MSS.',
          'Trace packet exchange using interactive sliding window diagram.'
        ],
        scaffoldingTips: 'Guide Rahul through the 1→2→4 doubling steps before introducing ssthresh.',
        groundedInCitation: 'Tanenbaum Ch 6, pp. 546-550'
      },
      {
        id: 'sec-cn-3',
        timeAllocationMinutes: 8,
        title: 'Guided Workshop: Flow Control (rwnd) vs Congestion Control (cwnd)',
        titleHindi: 'निर्देशित कार्यशाला: फ्लो कंट्रोल बनाम कंजेशन कंट्रोल तुलना',
        titleKannada: 'ಮಾರ್ಗದರ್ಶಿತ ಕಾರ್ಯಾಗಾರ: rwnd ಮತ್ತು cwnd ನಡುವಿನ ತುಲನಾತ್ಮಕ ಲೆಕ್ಕಾಚಾರ',
        icon: 'FlaskConical',
        teacherTalkingPoints: [
          'Explain effective window formula: Effective Window = min(cwnd, rwnd).',
          'Scenario 1: Fast sender, 10 Gbps network, but smartphone receiver buffer is only 4 KB → rwnd bottlenecks.',
          'Scenario 2: Fast server, fast phone, but congested router with high queue delay → cwnd bottlenecks.'
        ],
        teacherTalkingPointsHindi: [
          'इफेक्टिव विंडो फॉर्मूला समझाएं: Effective Window = min(cwnd, rwnd)',
          'केस 1: फोन धीमा है तो rwnd रोकेगा। केस 2: नेटवर्क जाम है तो cwnd रोकेगा।'
        ],
        teacherTalkingPointsKannada: [
          'ಪರಿಣಾಮಕಾರಿ ವಿಂಡೋ ಸೂತ್ರ: Effective Window = min(cwnd, rwnd).',
          'ರಿಸೀವರ್ ಬಫರ್ ತುಂಬಿದ್ದರೆ rwnd ನಿಯಂತ್ರಿಸುತ್ತದೆ; ನೆಟ್‌ವರ್ಕ್ ದಟ್ಟಣೆಯಾಗಿದ್ದರೆ cwnd ನಿಯಂತ್ರಿಸುತ್ತದೆ.'
        ],
        studentActivities: [
          'Solve scenario worksheet: Identify whether rwnd or cwnd is the bottleneck.'
        ],
        scaffoldingTips: 'Check Rahul’s min(cwnd, rwnd) worksheet answer first.',
        groundedInCitation: 'Tanenbaum Ch 6, p. 553'
      },
      {
        id: 'sec-cn-4',
        timeAllocationMinutes: 5,
        title: 'Formative AI Checkpoint: 3-Question Diagnostic',
        titleHindi: 'रचनात्मक मूल्यांकन: 3-प्रश्न टीसीपी क्विज़',
        titleKannada: 'ರಚನಾತ್ಮಕ ಮೌಲ್ಯಮಾಪನ: 3 ತ್ವರಿತ ರಸಪ್ರಶ್ನೆಗಳು',
        icon: 'HelpCircle',
        teacherTalkingPoints: [
          'Deploy the 3-question formative quiz on student tablets.',
          'Inspect Rahul and Rohan’s live Learning Twin mastery updates in real-time.'
        ],
        teacherTalkingPointsHindi: [
          '3-प्रश्नों की क्विज़ हल कराएं और राहुल का लाइव लर्निंग ट्विन स्कोर देखें।'
        ],
        teacherTalkingPointsKannada: [
          'ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ 3 ಪ್ರಶ್ನೆಗಳ ರಸಪ್ರಶ್ನೆ ನೀಡಿ ರಾಹುಲ್ ಅವರ ಲೈವ್ ಸ್ಕೋರ್ ಪರಿಶೀಲಿಸಿ.'
        ],
        studentActivities: [
          'Submit answers to the 3 TCP questions on tablet.'
        ],
        scaffoldingTips: 'Offer audio read-out of the Slow Start question for Rahul.',
        groundedInCitation: 'CBSE / CSE Framework 2026'
      },
      {
        id: 'sec-cn-5',
        timeAllocationMinutes: 3,
        title: 'Synthesis & Real-Time Twin Update Wrap-Up',
        titleHindi: 'निष्कर्ष और लर्निंग ट्विन अपडेट',
        titleKannada: 'ಉಪಸಂಹಾರ ಮತ್ತು ಕಲಿಕಾ ಟ್ವಿನ್ ನವೀಕರಣ',
        icon: 'CheckCircle2',
        teacherTalkingPoints: [
          'Summarize: TCP balances reliability with speed using feedback loops.',
          'Confirm that Rahul’s Flow Control mastery improved from 72% to 88% after today’s scaffolded analogies.'
        ],
        teacherTalkingPointsHindi: [
          'सारांश: टीसीपी फीडबैक लूप से विश्वसनीयता और गति दोनों बनाए रखता है।'
        ],
        teacherTalkingPointsKannada: [
          'ಸಾರಾಂಶ: ಟಿಸಿಪಿ ಫೀಡ್‌ಬ್ಯಾಕ್ ಲೂಪ್ ಬಳಸಿ ವಿಶ್ವಾಸಾರ್ಹತೆ ಮತ್ತು ವೇಗವನ್ನು ಕಾಪಾಡುತ್ತದೆ.'
        ],
        studentActivities: [
          '15-second exit ticket: Name the formula for effective window.'
        ],
        groundedInCitation: 'Tanenbaum Ch 6, p. 558'
      }
    ]
  },

  advancedActivity: {
    title: 'Advanced Inquiry: BBR (Bottleneck Bandwidth & RTT) vs Cubic',
    titleHindi: 'उच्च स्तरीय खोज: Google BBR बनाम TCP Cubic एल्गोरिदम',
    titleKannada: 'ಮುಂದುವರಿದ ಅನ್ವೇಷಣೆ: ಗೂಗಲ್ BBR ವರ್ಸಸ್ ಕ್ಯೂಬಿಕ್ ಅಲ್ಗಾರಿದಮ್',
    inquiryChallenge: 'Analyze why Google developed BBR to replace loss-based TCP Cubic, and how BBR achieves higher throughput on modern fiber & 5G networks without causing bufferbloat.',
    inquiryChallengeHindi: 'विश्लेषण करें कि Google ने लॉस-आधारित TCP Cubic को बदलने के लिए BBR क्यों विकसित किया, और BBR बिना बफरब्लोट के आधुनिक 5G और फाइबर नेटवर्क पर उच्च थ्रूपुट कैसे प्राप्त करता है।',
    inquiryChallengeKannada: 'ಬಫರ್ ಬ್ಲೋಟ್ ಉಂಟುಮಾಡದೆ ಆಧುನಿಕ ಫೈಬರ್ ಮತ್ತು 5G ನೆಟ್‌ವರ್ಕ್‌ಗಳಲ್ಲಿ ಹೆಚ್ಚಿನ ಥ್ರೂಪುಟ್ ಸಾಧಿಸಲು ಗೂಗಲ್ BBR ಅನ್ನು ಏಕೆ ಅಭಿವೃದ್ಧಿಪಡಿಸಿದೆ ಎಂದು ವಿಶ್ಲೇಷಿಸಿ.',
    deepQuestions: [
      'Why does traditional packet loss not always mean the network is congested (e.g. wireless packet corruption)?',
      'How does TCP BBR calculate delivery rate and min RTT without waiting for a packet drop?'
    ],
    extensionMaterials: [
      'Wireshark TCP packet trace file (.pcapng)',
      'BBR vs Cubic throughput comparison simulator'
    ],
    targetStudents: ['Vihaan Reddy', 'Ananya Iyer']
  },

  visualDiagram: {
    title: 'TCP Congestion Window Dynamics (Slow Start, AIMD & Fast Recovery)',
    imageUrl: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&q=80',
    caption: 'TCP Congestion Window expansion over time showing exponential Slow Start, ssthresh transition, additive increase, and multiplicative decrease on packet loss.',
    captionHindi: 'टीसीपी कंजेशन विंडो डायनेमिक्स: स्लो स्टार्ट, ssthresh थ्रेसहोल्ड, एडिटिव इंक्रीज और मल्टीप्लिकेटिव डिक्रीज।',
    hotspots: [
      { label: 'Slow Start Phase', hindiLabel: 'स्लो स्टार्ट चरण', description: 'Window doubles each RTT (1 → 2 → 4 → 8 MSS). Exponential growth.', x: 22, y: 70 },
      { label: 'ssthresh Threshold', hindiLabel: 'ssthresh थ्रेसहोल्ड', description: 'Transition point from exponential doubling to linear additive increase (+1 MSS/RTT).', x: 45, y: 40 },
      { label: 'Packet Loss (Timeout)', hindiLabel: 'पैकेट लॉस एवं कट', description: 'Timeout occurs: ssthresh set to cwnd/2, cwnd resets to 1 MSS.', x: 78, y: 25 },
      { label: 'Receiver Buffer (rwnd)', hindiLabel: 'रिसीवर बफर सीमा', description: 'Maximum window size the receiver can buffer without dropping bytes.', x: 85, y: 80 }
    ]
  },

  formativeQuiz: [
    {
      id: 'quiz-cn-1',
      question: 'In TCP Slow Start, if the current Congestion Window (cwnd) is 4 MSS and all 4 ACKs return successfully, what is the new cwnd?',
      questionHindi: 'टीसीपी स्लो स्टार्ट में, यदि वर्तमान cwnd 4 MSS है और सभी 4 ACK प्राप्त हो जाते हैं, तो नया cwnd क्या होगा?',
      questionKannada: 'ಟಿಸಿಪಿ ಸ್ಲೋ ಸ್ಟಾರ್ಟ್‌ನಲ್ಲಿ, ಪ್ರಸ್ತುತ cwnd 4 MSS ಆಗಿದ್ದು ಎಲ್ಲಾ 4 ACK ಗಳು ಬಂದರೆ ಹೊಸ cwnd ಎಷ್ಟು?',
      options: ['5 MSS (Increases by 1)', '8 MSS (Doubles)', '16 MSS (Squares)', '4 MSS (Remains unchanged)'],
      optionsHindi: ['5 MSS (1 की वृद्धि)', '8 MSS (दोगुना हो जाता है)', '16 MSS (वर्ग होता है)', '4 MSS (अपरिवर्तित)'],
      optionsKannada: ['5 MSS', '8 MSS (ದ್ವಿಗುಣ)', '16 MSS', '4 MSS'],
      correctAnswerIndex: 1,
      explanation: 'During Slow Start, cwnd doubles each RTT (increases by 1 MSS for every received ACK, so 4 + 4 = 8 MSS).',
      explanationHindi: 'स्लो स्टार्ट में प्रत्येक सफल RTT पर cwnd दोगुना (4 → 8 MSS) हो जाता है।',
      explanationKannada: 'ಸ್ಲೋ ಸ್ಟಾರ್ಟ್ ಹಂತದಲ್ಲಿ ಪ್ರತಿ RTT ನಲ್ಲಿ ವಿಂಡೋ ದ್ವಿಗುಣಗೊಳ್ಳುತ್ತದೆ (4 ರಿಂದ 8 MSS).',
      targetedConcept: 'Slow Start Exponential Growth',
      difficulty: 'Medium'
    },
    {
      id: 'quiz-cn-2',
      question: 'What is the key difference between Flow Control and Congestion Control in TCP?',
      questionHindi: 'टीसीपी में फ्लो कंट्रोल और कंजेशन कंट्रोल के बीच मुख्य अंतर क्या है?',
      questionKannada: 'ಟಿಸಿಪಿಯಲ್ಲಿ ಹರಿವು ನಿಯಂತ್ರಣ ಮತ್ತು ದಟ್ಟಣೆ ನಿಯಂತ್ರಣ ನಡುವಿನ ಪ್ರಮುಖ ವ್ಯತ್ಯಾಸವೇನು?',
      options: [
        'Flow control protects the receiver buffer (rwnd); congestion control protects the network pipe (cwnd).',
        'Flow control uses UDP; congestion control uses TCP.',
        'Flow control handles encryption; congestion control handles routing.',
        'There is no difference; they are the exact same mechanism.'
      ],
      optionsHindi: [
        'फ्लो कंट्रोल रिसीवर बफर (rwnd) की रक्षा करता है; कंजेशन कंट्रोल नेटवर्क की रक्षा करता है (cwnd)।',
        'फ्लो कंट्रोल UDP का उपयोग करता है; कंजेशन कंट्रोल TCP का।',
        'फ्लो कंट्रोल एन्क्रिप्शन संभालता है।',
        'दोनों में कोई अंतर नहीं है।'
      ],
      optionsKannada: [
        'ಹರಿವು ನಿಯಂತ್ರಣ ರಿಸೀವರ್ ಬಫರ್ (rwnd) ರಕ್ಷಿಸುತ್ತದೆ; ದಟ್ಟಣೆ ನಿಯಂತ್ರಣ ನೆಟ್‌ವರ್ಕ್ (cwnd) ರಕ್ಷಿಸುತ್ತದೆ.',
        'ಫ್ಲೋ ಕಂಟ್ರೋಲ್ ಯುಡಿಪಿ ಬಳಸುತ್ತದೆ.',
        'ಫ್ಲೋ ಕಂಟ್ರೋಲ್ ಎನ್‌ಕ್ರಿಪ್ಶನ್ ಆಗಿದೆ.',
        'ಯಾವುದೇ ವ್ಯತ್ಯಾಸವಿಲ್ಲ.'
      ],
      correctAnswerIndex: 0,
      explanation: 'Flow control is end-to-end (sender vs receiver buffer advertised via rwnd), while Congestion control is network-wide (preventing router queue overload via cwnd).',
      explanationHindi: 'फ्लो कंट्रोल रिसीवर बफर को भरने से रोकता है, जबकि कंजेशन कंट्रोल पूरे नेटवर्क में जाम से बचाता है।',
      explanationKannada: 'ಹರಿವು ನಿಯಂತ್ರಣ ರಿಸೀವರ್ ಬಫರ್ ರಕ್ಷಿಸುತ್ತದೆ ಮತ್ತು ದಟ್ಟಣೆ ನಿಯಂತ್ರಣ ಸಂಪೂರ್ಣ ನೆಟ್‌ವರ್ಕ್ ರಕ್ಷಿಸುತ್ತದೆ.',
      targetedConcept: 'Flow Control vs Congestion Control',
      difficulty: 'Easy'
    },
    {
      id: 'quiz-cn-3',
      question: 'If a sender has a Congestion Window (cwnd) of 20 KB and the receiver advertises a Receive Window (rwnd) of 8 KB, how much unacknowledged data can the sender transmit?',
      questionHindi: 'यदि प्रेषक का cwnd 20 KB है और रिसीवर का rwnd 8 KB है, तो प्रेषक अधिकतम कितना डेटा भेज सकता है?',
      questionKannada: 'ಕಳುಹಿಸುವವನ cwnd 20 KB ಮತ್ತು ಸ್ವೀಕರಿಸುವವನ rwnd 8 KB ಆಗಿದ್ದರೆ, ಎಷ್ಟು ಡೇಟಾವನ್ನು ಕಳುಹಿಸಬಹುದು?',
      options: ['20 KB (Uses cwnd)', '8 KB (Uses min(cwnd, rwnd))', '28 KB (Adds both)', '12 KB (Subtracts rwnd)'],
      optionsHindi: ['20 KB', '8 KB (min(cwnd, rwnd) का उपयोग)', '28 KB', '12 KB'],
      optionsKannada: ['20 KB', '8 KB (ಕನಿಷ್ಠ ಸೂತ್ರ)', '28 KB', '12 KB'],
      correctAnswerIndex: 1,
      explanation: 'Effective transmission window is always bounded by min(cwnd, rwnd) to avoid overwhelming both network and receiver.',
      explanationHindi: 'प्रभावी विंडो हमेशा min(cwnd, rwnd) होती है = min(20 KB, 8 KB) = 8 KB।',
      explanationKannada: 'ಪರಿಣಾಮಕಾರಿ ವಿಂಡೋ ಯಾವಾಗಲೂ min(cwnd, rwnd) = 8 KB ಆಗಿರುತ್ತದೆ.',
      targetedConcept: 'Effective Window Calculation',
      difficulty: 'Hard'
    }
  ]
};

export const MOCK_ADAPTIVE_ROUTES: AdaptiveRoute[] = [
  {
    id: 'route-student-a',
    studentPersona: 'Student A',
    studentName: 'Rahul Sharma / Aarav Sharma',
    preferenceDescription: 'Likes examples & physical analogies',
    routeSteps: [
      { phase: 'Phase 1', description: 'Real-world physical example (Water Pipe / Reservoir Funnel)', modality: 'example' },
      { phase: 'Phase 2', description: 'Step-by-step conceptual explanation with concrete analogies', modality: 'audio' },
      { phase: 'Phase 3', description: 'Targeted application question under guided prompts', modality: 'quiz' }
    ],
    sameLearningObjective: 'Master TCP Slow Start exponential window doubling & rwnd buffer limits'
  },
  {
    id: 'route-student-b',
    studentPersona: 'Student B',
    studentName: 'Priya Patel / Sneha Gupta',
    preferenceDescription: 'Prefers visual learning & diagram inspection',
    routeSteps: [
      { phase: 'Phase 1', description: 'Interactive visual diagram with color-coded window boundaries', modality: 'diagram' },
      { phase: 'Phase 2', description: 'Visual explanation with annotated packet transmission timelines', modality: 'diagram' },
      { phase: 'Phase 3', description: 'Hands-on interactive slider simulation with live feedback', modality: 'interaction' }
    ],
    sameLearningObjective: 'Master TCP Slow Start exponential window doubling & rwnd buffer limits'
  },
  {
    id: 'route-student-c',
    studentPersona: 'Student C',
    studentName: 'Prajwal Gowda / Vihaan Reddy',
    preferenceDescription: 'Struggles with English; needs bilingual regional voice',
    routeSteps: [
      { phase: 'Phase 1', description: 'Bilingual English core explanation with phonetic key terms', modality: 'example' },
      { phase: 'Phase 2', description: 'Kannada / Hindi audio voice explanation with regional metaphors', modality: 'audio' },
      { phase: 'Phase 3', description: 'Bilingual formative exit check in student\'s preferred language', modality: 'quiz' }
    ],
    sameLearningObjective: 'Master TCP Slow Start exponential window doubling & rwnd buffer limits'
  }
];

export const MOCK_TEACHER_RECOMMENDATIONS: TeacherCopilotRecommendation[] = [
  {
    id: 'rec-1',
    title: 'Prerequisite Activity Recommendation',
    strugglingStudentCount: 8,
    strugglingStudentNames: ['Rahul Sharma', 'Aarav Sharma', 'Rohan Verma', 'Priya Patel', 'Sneha Gupta', 'Vihaan Reddy', 'Prajwal Gowda', 'Ananya Iyer'],
    topic: 'Candidate Keys / Flow Control & Slow Start',
    recommendationText: '8 students are struggling with Flow Control & Slow Start. Consider adding a 7-minute prerequisite activity.',
    prerequisiteActivityMinutes: 7,
    status: 'pending'
  }
];

