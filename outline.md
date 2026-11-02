# Math Skills Trainer Architecture

## Project Goal

Create a web application to help a child develop rapid recall of basic arithmetic facts through repeated practice, progress tracking, and positive reinforcement.

### Educational Goals

The application should:

- Build automatic recall of addition and subtraction facts to 20
- Support Singapore Math concepts such as Number Bonds
- Reduce reliance on finger counting
- Identify weak facts automatically
- Focus practice on weaknesses
- Reward effort, consistency, and improvement
- Maintain long-term progress history

The application is intended for home use and will initially run on localhost.

---

# Technology Stack

## Frontend

- Angular
- Angular Signals for state management
- Standalone Components

## Backend

- ASP.NET Core Web API
- C#

## Database

- PostgreSQL

## Deployment

- Docker Compose

---

# High-Level Architecture

```text
+--------------------+
| Angular Front End  |
+---------+----------+
          |
          | REST API
          |
+---------v----------+
| ASP.NET Core API   |
|                    |
| Question Engine    |
| Mastery Engine     |
| Reward Engine      |
| Statistics Engine  |
+---------+----------+
          |
          |
+---------v----------+
| PostgreSQL         |
+--------------------+
```

---

# Core Principles

## Track Facts, Not Worksheets

Instead of:

```text
Worksheet #12
Score: 85%
```

Track individual facts:

```text
7 + 8
Accuracy: 95%

16 - 9
Accuracy: 55%
```

This allows the system to identify specific weaknesses and target practice effectively.

---

# Domain Model

## Student

```csharp
Student
{
    Guid Id;
    string Name;
    DateTime CreatedAt;
}
```

Supports multiple children in the future.

---

## MathFact

Represents a single arithmetic fact.

```csharp
MathFact
{
    Guid Id;
    int Operand1;
    int Operand2;
    OperationType Operation;
    int Answer;
}
```

Examples:

```text
7 + 8 = 15
16 - 9 = 7
```

Facts should be generated during initial database setup.

---

## NumberBond

Singapore Math concept.

```csharp
NumberBond
{
    Guid Id;
    int Whole;
    int PartA;
    int PartB;
}
```

Examples:

```text
10 = 4 + 6
15 = 7 + 8
20 = 12 + 8
```

Number bond mastery should be tracked independently.

---

## Fact Family

Related facts.

Example:

```text
7 + 8 = 15
8 + 7 = 15
15 - 8 = 7
15 - 7 = 8
```

```csharp
FactFamily
{
    Guid Id;
    int A;
    int B;
    int Whole;
}
```

Learning one fact contributes toward mastering the family.

---

## Attempt

Every answer is recorded.

```csharp
Attempt
{
    Guid Id;
    Guid StudentId;
    Guid MathFactId;

    bool Correct;

    int ResponseTimeMs;

    DateTime AttemptedAt;
}
```

This table becomes the foundation of all analytics.

---

## FactMastery

Stores calculated mastery levels.

```csharp
FactMastery
{
    Guid StudentId;
    Guid MathFactId;

    int MasteryScore;
    DateTime LastPracticed;
}
```

Mastery score range:

```text
0-100
```

---

## Reward

```csharp
Reward
{
    Guid Id;
    string Name;
    string Description;
    RewardType Type;
}
```

---

## StudentReward

```csharp
StudentReward
{
    Guid StudentId;
    Guid RewardId;
    DateTime UnlockedAt;
}
```

---

# Practice Modes

## Practice Mode

Purpose:

```text
Learn without pressure
```

Characteristics:

- No timer
- Immediate feedback
- Encouragement after mistakes

---

## Challenge Mode

Purpose:

```text
Increase recall speed
```

Examples:

- 20-question challenge
- 60-second challenge
- Beat your best score

---

## Weakness Training Mode

Purpose:

```text
Focus on weak facts
```

The system selects facts that are:

- Frequently missed
- Solved slowly
- Not practiced recently

---

## Number Bond Mode

Purpose:

```text
Develop part-part-whole understanding
```

Examples:

```text
7 + ? = 15
```

```text
15 = 8 + ?
```

```text
Whole = 15

Parts?
```

Visual number bond diagrams can be used.

---

# Mastery Engine

## Why Response Time Matters

A child may answer correctly but only after counting.

The goal is not merely correctness.

The goal is automatic recall.

Therefore mastery should include:

- Accuracy
- Speed
- Recency

---

## Example Formula

```text
Mastery =
(Accuracy × 0.6)
+
(Speed × 0.3)
+
(Recency × 0.1)
```

Scale:

```text
0 - 100
```

---

## Performance Categories

| Response Time | Classification |
|--------------|---------------|
| < 2 sec | Automatic |
| 2-4 sec | Strong |
| 4-7 sec | Developing |
| > 7 sec | Counting |

These categories are primarily for analytics and parent reports.

---

# Question Selection Engine

Questions should not be purely random.

Use weighted selection.

Example:

```text
50% Weak Facts
30% Learning Facts
20% Mastered Facts
```

This creates spaced repetition naturally.

Pseudo-code:

```csharp
if (weakFactsExist)
{
    SelectWeakFact();
}
else
{
    SelectRandomFact();
}
```

---

# Reward System

## Design Goal

Reward:

- Improvement
- Consistency
- Persistence

Avoid rewarding only perfect scores.

---

# Sticker Examples

## Fast Fox

```text
10 answers under 2 seconds
```

## Addition Explorer

```text
Master all addition facts to 10
```

## Practice Hero

```text
Practice 7 days in a row
```

## Comeback Kid

```text
Improve a weak fact
```

---

# Collectible Cards

Cards unlock through achievements.

Themes:

- Dinosaurs
- Space
- Dragons
- Animals
- Vehicles
- Princesses
- Fantasy Creatures

Example rarity levels:

```text
Common
Rare
Epic
Legendary
```

Collection progress is often highly motivating for children.

---

# Parent Dashboard

## Overview

Display:

```text
Overall Accuracy
Current Streak
Best Streak
Facts Mastered
Cards Collected
```

---

## Skill Breakdown

```text
Addition to 10
Addition to 20
Subtraction to 10
Subtraction to 20
Number Bonds to 10
Number Bonds to 20
```

---

## Weak Facts

Examples:

```text
16 - 9
14 - 8
7 + 8
9 + 6
```

---

## Heat Map

Display mastery levels using colors.

```text
Green = Mastered
Yellow = Developing
Red = Needs Work
```

This should quickly reveal learning gaps.

---

# Angular Application Structure

```text
src/
├─ app/
│
├─ core/
│  ├─ api/
│  ├─ services/
│  └─ models/
│
├─ shared/
│  ├─ components/
│  ├─ pipes/
│  └─ directives/
│
├─ features/
│  ├─ practice/
│  ├─ challenge/
│  ├─ number-bonds/
│  ├─ rewards/
│  ├─ dashboard/
│  └─ settings/
│
└─ assets/
```

---

# ASP.NET Core Structure

```text
Api/
├─ Controllers/
├─ Services/
├─ Domain/
├─ Infrastructure/
├─ Data/
├─ Repositories/
└─ Migrations/
```

Recommended services:

```text
QuestionService
MasteryService
RewardService
StatisticsService
FactFamilyService
NumberBondService
```

Business logic should live in services, not controllers.

---

# Docker Compose

```yaml
services:

  frontend:
    build: ./frontend
    ports:
      - "4200:80"

  api:
    build: ./api
    ports:
      - "5000:8080"
    depends_on:
      - postgres

  postgres:
    image: postgres:16

    environment:
      POSTGRES_DB: mathtrainer
      POSTGRES_USER: mathtrainer
      POSTGRES_PASSWORD: secret

    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

---

# Version 1 Scope

## Include

- Addition to 20
- Subtraction to 20
- Number Bonds to 20
- Student profiles
- Attempt history
- Mastery tracking
- Weakness detection
- Practice mode
- Challenge mode
- Reward stickers
- Collectible cards
- Parent dashboard
- Docker deployment

---

## Future Features

- Multiplication
- Division
- Fractions
- Times tables
- Printable certificates
- Multiple reward collections
- Hosted version
- Mobile app
- Teacher dashboard

---

# Success Criteria

The application succeeds when:

- The child enjoys practicing.
- Weak facts are automatically identified.
- Response times decrease over time.
- Number bond understanding improves.
- Finger counting gradually disappears.
- Parents can clearly see progress and weaknesses.

The focus is not achieving a high score.

The focus is building automatic recall of foundational math facts.
