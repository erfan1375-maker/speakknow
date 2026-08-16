export type Difficulty = "easy" | "medium" | "hard";

export interface RawQuestion {
  q: string;
  correct: string;
  distractors: [string, string, string];
  difficulty: Difficulty;
}

// ---------------------------------------------------------------------------
// Vocabulary — 15 easy / 15 medium / 15 hard
// ---------------------------------------------------------------------------
export const vocabularyQuestions: RawQuestion[] = [
  // easy
  { q: "She drinks a cup of ___ every morning.", correct: "coffee", distractors: ["chair", "mountain", "window"], difficulty: "easy" },
  { q: "The opposite of 'big' is ___.", correct: "small", distractors: ["tall", "fast", "loud"], difficulty: "easy" },
  { q: "I usually ___ breakfast at 7 a.m.", correct: "eat", distractors: ["drive", "sleep", "swim"], difficulty: "easy" },
  { q: "A baby dog is called a ___.", correct: "puppy", distractors: ["kitten", "cub", "chick"], difficulty: "easy" },
  { q: "We use an umbrella when it is ___.", correct: "raining", distractors: ["sunny", "cold", "windy"], difficulty: "easy" },
  { q: "My brother works in a ___; he treats sick people.", correct: "hospital", distractors: ["library", "bakery", "garage"], difficulty: "easy" },
  { q: "Choose the word closest in meaning to 'happy'.", correct: "glad", distractors: ["angry", "tired", "bored"], difficulty: "easy" },
  { q: "I need to buy some ___ to write a letter.", correct: "paper", distractors: ["soup", "shoes", "music"], difficulty: "easy" },
  { q: "The sun rises in the ___.", correct: "east", distractors: ["west", "north", "south"], difficulty: "easy" },
  { q: "She always says 'thank you' because she is very ___.", correct: "polite", distractors: ["rude", "lazy", "quiet"], difficulty: "easy" },
  { q: "A place where you can borrow books is a ___.", correct: "library", distractors: ["bakery", "bank", "cinema"], difficulty: "easy" },
  { q: "It's very cold today; you should wear a ___.", correct: "coat", distractors: ["swimsuit", "sandal", "T-shirt"], difficulty: "easy" },
  { q: "The opposite of 'open' is ___.", correct: "closed", distractors: ["empty", "full", "new"], difficulty: "easy" },
  { q: "We eat dinner in the ___ in the evening.", correct: "kitchen", distractors: ["garage", "bathroom", "attic"], difficulty: "easy" },
  { q: "She feels ___ because she didn't sleep well.", correct: "tired", distractors: ["excited", "hungry", "proud"], difficulty: "easy" },

  // medium
  { q: "The manager decided to ___ the meeting until next week.", correct: "postpone", distractors: ["celebrate", "ignore", "repair"], difficulty: "medium" },
  { q: "It was such a ___ movie that everyone was crying by the end.", correct: "touching", distractors: ["boring", "cheap", "loud"], difficulty: "medium" },
  { q: "He tried to ___ his mistake by apologizing quickly.", correct: "fix", distractors: ["hide", "ignore", "celebrate"], difficulty: "medium" },
  { q: "The company had to ___ many workers because of low sales.", correct: "lay off", distractors: ["hire", "promote", "train"], difficulty: "medium" },
  { q: "She was ___ when she heard the surprising news.", correct: "astonished", distractors: ["bored", "relaxed", "hungry"], difficulty: "medium" },
  { q: "You should ___ your opinion with clear examples.", correct: "support", distractors: ["hide", "forget", "waste"], difficulty: "medium" },
  { q: "The old bridge was considered too ___ to use safely.", correct: "fragile", distractors: ["colorful", "cheap", "popular"], difficulty: "medium" },
  { q: "He is very ___; he never wastes money on things he doesn't need.", correct: "frugal", distractors: ["generous", "careless", "lazy"], difficulty: "medium" },
  { q: "The doctor advised her to ___ smoking immediately.", correct: "quit", distractors: ["start", "enjoy", "practice"], difficulty: "medium" },
  { q: "It's important to ___ your goals clearly before starting a project.", correct: "define", distractors: ["forget", "hide", "waste"], difficulty: "medium" },
  { q: "The forecast said it would be ___ tomorrow, so bring a jacket.", correct: "chilly", distractors: ["delicious", "honest", "wealthy"], difficulty: "medium" },
  { q: "The teacher asked the students to ___ their essays before submitting them.", correct: "revise", distractors: ["destroy", "memorize", "ignore"], difficulty: "medium" },
  { q: "He felt a strong sense of ___ after finishing the marathon.", correct: "accomplishment", distractors: ["confusion", "boredom", "jealousy"], difficulty: "medium" },
  { q: "The new policy will ___ affect small businesses the most.", correct: "significantly", distractors: ["rarely", "barely", "accidentally"], difficulty: "medium" },
  { q: "She tends to ___ before making any big decision.", correct: "hesitate", distractors: ["celebrate", "shout", "forget"], difficulty: "medium" },

  // hard
  { q: "His argument was so ___ that even experts struggled to find a flaw.", correct: "cogent", distractors: ["trivial", "vague", "redundant"], difficulty: "hard" },
  { q: "The committee's decision was widely seen as ___ and unfair.", correct: "arbitrary", distractors: ["transparent", "popular", "delayed"], difficulty: "hard" },
  { q: "She gave a ___ account of the events, leaving out no detail.", correct: "meticulous", distractors: ["careless", "brief", "vague"], difficulty: "hard" },
  { q: "The new evidence completely ___ the earlier theory.", correct: "undermined", distractors: ["supported", "ignored", "celebrated"], difficulty: "hard" },
  { q: "His speech was full of ___ remarks that offended several guests.", correct: "tactless", distractors: ["diplomatic", "humble", "cheerful"], difficulty: "hard" },
  { q: "The negotiations reached an ___ after months of disagreement.", correct: "impasse", distractors: ["agreement", "celebration", "apology"], difficulty: "hard" },
  { q: "Her ___ approach to problem-solving impressed the entire team.", correct: "methodical", distractors: ["chaotic", "careless", "hesitant"], difficulty: "hard" },
  { q: "The critic described the novel as ___, praising its depth and originality.", correct: "profound", distractors: ["shallow", "dull", "predictable"], difficulty: "hard" },
  { q: "Despite the criticism, he remained ___ in his beliefs.", correct: "steadfast", distractors: ["indecisive", "apologetic", "confused"], difficulty: "hard" },
  { q: "The company's profits were ___ by the sudden rise in costs.", correct: "eroded", distractors: ["boosted", "celebrated", "doubled"], difficulty: "hard" },
  { q: "It was a ___ decision, made without any real thought.", correct: "rash", distractors: ["calculated", "wise", "delayed"], difficulty: "hard" },
  { q: "The professor's explanation was so ___ that even beginners understood it easily.", correct: "lucid", distractors: ["convoluted", "ambiguous", "tedious"], difficulty: "hard" },
  { q: "The two countries finally reached a ___ after years of conflict.", correct: "truce", distractors: ["dispute", "defeat", "blockade"], difficulty: "hard" },
  { q: "Her ___ remarks made it clear she disagreed with the plan.", correct: "blunt", distractors: ["ambiguous", "flattering", "silent"], difficulty: "hard" },
  { q: "The scientist's findings were later proven to be ___.", correct: "erroneous", distractors: ["accurate", "famous", "simple"], difficulty: "hard" },
];

// ---------------------------------------------------------------------------
// Grammar — 15 easy / 15 medium / 15 hard
// ---------------------------------------------------------------------------
export const grammarQuestions: RawQuestion[] = [
  // easy
  { q: "She ___ to school every day.", correct: "goes", distractors: ["go", "going", "gone"], difficulty: "easy" },
  { q: "They ___ watching a movie right now.", correct: "are", distractors: ["is", "am", "be"], difficulty: "easy" },
  { q: "I ___ a doctor.", correct: "am", distractors: ["is", "are", "be"], difficulty: "easy" },
  { q: "He ___ his homework yesterday.", correct: "did", distractors: ["do", "does", "doing"], difficulty: "easy" },
  { q: "There ___ two books on the table.", correct: "are", distractors: ["is", "am", "be"], difficulty: "easy" },
  { q: "___ you like tea?", correct: "Do", distractors: ["Does", "Are", "Is"], difficulty: "easy" },
  { q: "She is ___ than her sister.", correct: "taller", distractors: ["tall", "tallest", "more tall"], difficulty: "easy" },
  { q: "We ___ dinner at 7 p.m. every night.", correct: "have", distractors: ["has", "having", "had"], difficulty: "easy" },
  { q: "This is ___ pen.", correct: "my", distractors: ["I", "me", "mine"], difficulty: "easy" },
  { q: "He can ___ very well.", correct: "swim", distractors: ["swims", "swimming", "to swim"], difficulty: "easy" },
  { q: "I ___ born in 1998.", correct: "was", distractors: ["is", "am", "were"], difficulty: "easy" },
  { q: "She doesn't ___ coffee.", correct: "like", distractors: ["likes", "liking", "liked"], difficulty: "easy" },
  { q: "They went to the park ___ Sunday.", correct: "on", distractors: ["in", "at", "by"], difficulty: "easy" },
  { q: "___ is your name?", correct: "What", distractors: ["Who", "Where", "When"], difficulty: "easy" },
  { q: "He is the ___ boy in the class.", correct: "tallest", distractors: ["taller", "tall", "more tall"], difficulty: "easy" },

  // medium
  { q: "By the time we arrived, the movie ___ already started.", correct: "had", distractors: ["has", "have", "was"], difficulty: "medium" },
  { q: "If it rains tomorrow, we ___ the picnic.", correct: "will cancel", distractors: ["cancel", "canceled", "would cancel"], difficulty: "medium" },
  { q: "She has been working here ___ five years.", correct: "for", distractors: ["since", "at", "from"], difficulty: "medium" },
  { q: "The letter ___ by the manager yesterday.", correct: "was signed", distractors: ["signed", "is signed", "has signed"], difficulty: "medium" },
  { q: "I wish I ___ more time to finish this project.", correct: "had", distractors: ["have", "has", "will have"], difficulty: "medium" },
  { q: "He suggested ___ the meeting to Friday.", correct: "moving", distractors: ["to move", "moved", "move"], difficulty: "medium" },
  { q: "This is the book ___ I told you about.", correct: "that", distractors: ["who", "whom", "whose"], difficulty: "medium" },
  { q: "Neither of the answers ___ correct.", correct: "is", distractors: ["are", "were", "being"], difficulty: "medium" },
  { q: "She would have called you if she ___ your number.", correct: "had had", distractors: ["has", "had", "have"], difficulty: "medium" },
  { q: "The report needs to ___ by Monday.", correct: "be finished", distractors: ["finish", "be finishing", "finished"], difficulty: "medium" },
  { q: "___ studying hard, he failed the exam.", correct: "Despite", distractors: ["Although", "Because", "Since"], difficulty: "medium" },
  { q: "By next year, she ___ her degree.", correct: "will have finished", distractors: ["will finish", "has finished", "finishes"], difficulty: "medium" },
  { q: "He is used to ___ up early.", correct: "waking", distractors: ["wake", "woke", "waken"], difficulty: "medium" },
  { q: "The more you practice, ___ you become.", correct: "the better", distractors: ["better", "the best", "best"], difficulty: "medium" },
  { q: "I'd rather you ___ tell anyone about this.", correct: "didn't", distractors: ["don't", "wouldn't", "hadn't"], difficulty: "medium" },

  // hard
  { q: "Not only ___ late, but he also forgot the documents.", correct: "did he arrive", distractors: ["he arrived", "he did arrive", "arrived he"], difficulty: "hard" },
  { q: "Had she known about the traffic, she ___ earlier.", correct: "would have left", distractors: ["would leave", "had left", "left"], difficulty: "hard" },
  { q: "It is essential that he ___ present at the meeting.", correct: "be", distractors: ["is", "was", "being"], difficulty: "hard" },
  { q: "Rarely ___ such a compelling argument.", correct: "have I heard", distractors: ["I have heard", "I heard", "did I heard"], difficulty: "hard" },
  { q: "She insisted that the report ___ rewritten.", correct: "be", distractors: ["is", "was", "will be"], difficulty: "hard" },
  { q: "___ the weather, the event will proceed as planned.", correct: "Regardless of", distractors: ["Despite of", "In spite", "Although"], difficulty: "hard" },
  { q: "No sooner ___ the building than the fire alarm went off.", correct: "had he entered", distractors: ["he had entered", "did he enter", "he entered"], difficulty: "hard" },
  { q: "The proposal, ___ merits are questionable, was rejected.", correct: "whose", distractors: ["which", "that", "who"], difficulty: "hard" },
  { q: "Were it not for your help, I ___ have finished on time.", correct: "would not", distractors: ["will not", "don't", "didn't"], difficulty: "hard" },
  { q: "So exhausted ___ that she fell asleep instantly.", correct: "was she", distractors: ["she was", "did she", "had she"], difficulty: "hard" },
  { q: "The manager demanded that the report ___ submitted immediately.", correct: "be", distractors: ["is", "was", "will be"], difficulty: "hard" },
  { q: "Little ___ that the decision would change everything.", correct: "did he know", distractors: ["he knew", "he did know", "knew he"], difficulty: "hard" },
  { q: "___ for his quick thinking, the accident would have been much worse.", correct: "Had it not been", distractors: ["If it wasn't", "Unless it was", "Without it being"], difficulty: "hard" },
  { q: "She behaves as if she ___ the manager, though she isn't.", correct: "were", distractors: ["was", "is", "be"], difficulty: "hard" },
  { q: "Only after the deadline passed ___ the mistake.", correct: "did they notice", distractors: ["they noticed", "they did notice", "noticed they"], difficulty: "hard" },
];

// ---------------------------------------------------------------------------
// Reading — 3 passages, 5 questions each
// ---------------------------------------------------------------------------
export interface RawPassage {
  title: string;
  body: string;
  questions: RawQuestion[];
}

export const readingPassages: RawPassage[] = [
  {
    title: "A Day at the Market",
    body: "Every Saturday morning, Layla walks to the local market near her house. The market opens at seven o'clock, and by eight, it is already full of people. Layla likes to buy fresh vegetables, fruit, and bread from the small stalls. Her favorite stall belongs to Mr. Ahmadi, who always gives her a free apple because she is a regular customer. Layla usually spends about one hour at the market before walking home. On her way back, she often stops at a small café to drink tea and rest for a few minutes. She says that going to the market every week helps her relax and forget about her busy job during the week.",
    questions: [
      { q: "What time does the market open?", correct: "Seven o'clock", distractors: ["Eight o'clock", "Nine o'clock", "Six o'clock"], difficulty: "easy" },
      { q: "What does Layla usually buy at the market?", correct: "Vegetables, fruit, and bread", distractors: ["Clothes and shoes", "Books and pens", "Furniture"], difficulty: "easy" },
      { q: "Why does Mr. Ahmadi give Layla a free apple?", correct: "Because she is a regular customer", distractors: ["Because it's her birthday", "Because she works there", "Because the apples are old"], difficulty: "easy" },
      { q: "What does Layla do after shopping?", correct: "She stops at a café for tea", distractors: ["She goes straight home", "She takes a taxi", "She visits a friend"], difficulty: "medium" },
      { q: "Why does Layla enjoy going to the market?", correct: "It helps her relax", distractors: ["It is required for her job", "She meets her family there", "It is the cheapest place to shop"], difficulty: "medium" },
    ],
  },
  {
    title: "The Rise of Remote Work",
    body: "Over the past decade, remote work has become increasingly common across many industries. Advances in technology, such as high-speed internet and video conferencing tools, have made it possible for employees to complete their tasks from home just as effectively as they would in a traditional office. Many companies have discovered that remote work can reduce costs, since they no longer need to rent large office spaces. Employees, too, often report higher job satisfaction because they save time on commuting and have more flexibility in managing their schedules. However, remote work is not without its challenges. Some workers struggle with feelings of isolation, as they miss the social interaction that comes naturally in an office setting. Others find it difficult to separate their professional and personal lives when their home becomes their workplace. As a result, many organizations are now exploring hybrid models, which combine remote work with occasional days in the office, in an attempt to balance flexibility with collaboration.",
    questions: [
      { q: "What has made remote work more common?", correct: "Advances in technology", distractors: ["Lower salaries", "Government laws", "Shorter work hours"], difficulty: "medium" },
      { q: "Why do companies benefit from remote work?", correct: "It can reduce office costs", distractors: ["It increases office rent", "It requires more employees", "It eliminates the need for the internet"], difficulty: "medium" },
      { q: "What is one advantage for employees mentioned in the passage?", correct: "More flexibility in managing schedules", distractors: ["Higher travel expenses", "Less job satisfaction", "More time spent commuting"], difficulty: "medium" },
      { q: "What is a challenge of remote work mentioned in the text?", correct: "Feelings of isolation", distractors: ["Too much social interaction", "Lack of internet access", "Higher office costs"], difficulty: "medium" },
      { q: "What is a hybrid model, according to the passage?", correct: "A combination of remote work and office days", distractors: ["A fully remote work system", "A fully in-office work system", "A shorter work week"], difficulty: "hard" },
    ],
  },
  {
    title: "The Paradox of Choice",
    body: "In modern consumer societies, people are often presented with an overwhelming number of options, from the type of coffee they drink to the career path they pursue. Conventional wisdom suggests that having more choices leads to greater satisfaction, since individuals can select the option that best matches their preferences. However, psychological research has revealed a counterintuitive phenomenon known as the paradox of choice. According to this theory, an abundance of options can actually increase anxiety and decrease overall satisfaction. When faced with too many alternatives, people frequently experience decision fatigue, a state in which the mental effort required to evaluate each option leads to poorer decision-making and a reluctance to choose at all. Furthermore, once a decision has been made, individuals with many alternatives are more prone to second-guessing themselves, wondering whether an unselected option might have been superior. This tendency can diminish the enjoyment derived from the chosen option, even if it was, objectively, a good decision. Some researchers argue that reducing the number of choices presented to consumers, rather than expanding it, may paradoxically lead to higher levels of contentment and confidence in decision-making.",
    questions: [
      { q: "What does conventional wisdom suggest about having more choices?", correct: "It leads to greater satisfaction", distractors: ["It always causes anxiety", "It has no effect on satisfaction", "It reduces decision-making ability"], difficulty: "hard" },
      { q: "What is the 'paradox of choice'?", correct: "More options can decrease satisfaction", distractors: ["Fewer options always cause stress", "Choices have no psychological effect", "People never regret their decisions"], difficulty: "hard" },
      { q: "What is 'decision fatigue'?", correct: "Mental exhaustion from evaluating too many options", distractors: ["Physical tiredness from shopping", "A preference for fewer products", "A type of memory loss"], difficulty: "hard" },
      { q: "According to the passage, what often happens after people choose among many alternatives?", correct: "They tend to second-guess their choice", distractors: ["They immediately forget the other options", "They always feel more confident", "They never think about it again"], difficulty: "hard" },
      { q: "What do some researchers suggest businesses should do?", correct: "Reduce the number of choices offered", distractors: ["Increase the number of choices offered", "Remove all choices entirely", "Ignore consumer psychology"], difficulty: "hard" },
    ],
  },
];

// ---------------------------------------------------------------------------
// Listening — 1 placeholder clip, 5 questions
// ---------------------------------------------------------------------------
export interface RawClip {
  title: string;
  audioUrl: string;
  transcript: string;
  questions: RawQuestion[];
}

export const listeningClips: RawClip[] = [
  {
    title: "Sarah's Decision",
    audioUrl: "/audio/listening-1.mp3",
    transcript: "",
    questions: [
      { q: "Where does Sarah live?", correct: "Near the sea", distractors: ["In a big city", "In the mountains", "Abroad"], difficulty: "easy" },
      { q: "What does Sarah do every morning?", correct: "She walks on the beach", distractors: ["She reads a book", "She swims", "She cooks breakfast"], difficulty: "easy" },
      { q: "Why is Sarah considering a career change?", correct: "It would require moving to a bigger city", distractors: ["She lost her job", "She wants to retire", "Her friends forced her"], difficulty: "medium" },
      { q: "How do Sarah's friends feel about taking risks?", correct: "They think it's necessary for growth", distractors: ["They think it's dangerous", "They don't care", "They disagree with her"], difficulty: "medium" },
      { q: "What is Sarah's main internal conflict, as described in the passage?", correct: "Whether comfort is preventing her from valuable opportunities", distractors: ["Choosing between two jobs", "Deciding where to live permanently", "Convincing her friends she's right"], difficulty: "hard" },
    ],
  },
  {
    title: "Tom's New Challenge",
    audioUrl: "/audio/listening-2.mp3",
    transcript: "",
    questions: [
      { q: "What is Tom's job?", correct: "A chef", distractors: ["A waiter", "A farmer", "A manager"], difficulty: "easy" },
      { q: "When does Tom start his shift?", correct: "In the afternoon", distractors: ["In the morning", "At noon", "At night"], difficulty: "easy" },
      { q: "What did the restaurant owner ask Tom to do?", correct: "Develop a sustainable menu", distractors: ["Hire new staff", "Close the restaurant", "Reduce prices"], difficulty: "medium" },
      { q: "How does Tom feel about this new challenge?", correct: "Both excited and overwhelmed", distractors: ["Bored", "Angry", "Indifferent"], difficulty: "medium" },
      { q: "What has Tom been doing differently in his mornings, and why?", correct: "Visiting farms and building supplier relationships, to source local ingredients", distractors: ["Sleeping in, because he's tired", "Taking cooking classes, to learn new skills", "Interviewing new chefs, to hire help"], difficulty: "hard" },
    ],
  },
  {
    title: "Emma's Path",
    audioUrl: "/audio/listening-3.mp3",
    transcript: "",
    questions: [
      { q: "What did Emma study at university?", correct: "Environmental science", distractors: ["Business", "Law", "Medicine"], difficulty: "easy" },
      { q: "What did Emma do while job-searching?", correct: "She volunteered at a conservation project", distractors: ["She traveled", "She started a business", "She took a break"], difficulty: "easy" },
      { q: "What did Emma learn from her volunteer experience?", correct: "Practical skills, including environmental policy challenges", distractors: ["How to cook", "How to teach", "How to code"], difficulty: "medium" },
      { q: "What surprised Emma about her own interests?", correct: "She preferred policy work over fieldwork", distractors: ["She disliked environmental work", "She wanted to change careers entirely", "She missed university"], difficulty: "medium" },
      { q: "What is Emma's current plan, and how does it relate to her original expectations?", correct: "Apply to environmental law graduate programs, a shift from her original fieldwork-focused plans", distractors: ["Apply to law school, unrelated to her studies", "Return to fieldwork, as originally planned", "Quit environmental science altogether"], difficulty: "hard" },
    ],
  },
];
