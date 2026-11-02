# Math Skills Trainer - Step-by-Step Build Plan

## Project Vision

Build a self-hosted educational web application that helps children develop automatic recall of addition and subtraction facts through targeted practice, mastery tracking, and positive reinforcement.

Primary educational goals:

- Automatic recall of math facts
- Support Singapore Math concepts
- Support Number Bonds
- Reduce finger counting
- Identify weaknesses automatically
- Reward improvement and consistency
- Track long-term progress

Technology stack:

- Angular
- ASP.NET Core Web API
- PostgreSQL
- Docker Compose
- Linux Host

---

# Phase 0 - Project Setup

## Goal

Create a runnable skeleton application.

## Deliverables

Repository structure:

```text
math-skills-trainer/

├── frontend/
├── api/
├── database/
├── docker-compose.yml
└── docs/
```

---

## Frontend

Create Angular application.

Features:

- Angular latest stable
- Standalone components
- Routing enabled

Initial pages:

```text
/
Practice
Dashboard
Rewards
Settings
```

---

## Backend

Create ASP.NET Core Web API.

Initial configuration:

- Entity Framework Core
- PostgreSQL provider
- Swagger

---

## Database

Create PostgreSQL container.

Verify:

- API can connect
- Migration can run

---

## Docker

Create containers for:

- frontend
- api
- postgres

Success criteria:

```bash
docker compose up
```

starts entire application.

---

# Phase 1 - Core Practice Mode

## Goal

Allow child to answer questions.

No rewards.
No analytics.
No mastery.

Just practice.

---

## Database Tables

### Student

```sql
Student
```

Fields:

```text
Id
Name
CreatedAt
```

---

### MathFact

```sql
MathFact
```

Fields:

```text
Id
Operation
Operand1
Operand2
Answer
```

---

## Seed Facts

Generate:

### Addition

```text
0 + 0
through
20 + 0
```

limited to answers <= 20

---

### Subtraction

```text
20 - 0
through
20 - 20
```

only valid answers.

---

## API Endpoints

### Get Question

```http
GET /questions/random
```

Returns:

```json
{
  "id": 42,
  "operand1": 7,
  "operand2": 8,
  "operation": "+"
}
```

---

### Submit Answer

```http
POST /attempts
```

Request:

```json
{
  "questionId": 42,
  "answer": 15
}
```

Response:

```json
{
  "correct": true
}
```

---

## Frontend

Single practice screen.

Flow:

```text
Question
↓
Answer
↓
Immediate Feedback
↓
Next Question
```

Success criteria:

Child can answer questions continuously.

---

# Phase 2 - Attempt Tracking

## Goal

Remember everything.

This becomes the foundation of the entire system.

---

## Database

### Attempt

```sql
Attempt
```

Fields:

```text
Id
StudentId
MathFactId
GivenAnswer
Correct
ResponseTimeMs
AttemptedAt
```

---

## Frontend

Start timer when question appears.

Stop timer when answer submitted.

Save response time.

---

## Dashboard

Display:

```text
Questions Answered
Correct Answers
Accuracy
```

Success criteria:

A complete history exists for every attempt.

---

# Phase 3 - Mastery Engine

## Goal

Measure understanding of each fact.

---

## Table

### FactMastery

```sql
FactMastery
```

Fields:

```text
StudentId
MathFactId
MasteryScore
LastPracticed
```

---

## Mastery Formula

Version 1:

```text
60% Accuracy
30% Speed
10% Recency
```

Scale:

```text
0-100
```

---

## Categories

| Score | Status |
|---------|---------|
| 0-39 | Weak |
| 40-69 | Learning |
| 70-89 | Strong |
| 90-100 | Mastered |

---

## Dashboard

Display:

```text
Strong Facts
Weak Facts
Mastered Facts
```

Success criteria:

System can identify problem areas.

---

# Phase 4 - Weakness Training

## Goal

Target weaknesses automatically.

---

## Question Selection

Instead of random:

```text
50% Weak
30% Learning
20% Mastered
```

---

## New Practice Mode

### Focus Mode

Only presents:

```text
Weak facts
```

Examples:

```text
16 - 9
14 - 8
7 + 8
```

---

## Dashboard

Show:

```text
Top 10 Weak Facts
```

Success criteria:

Practice adapts to child performance.

---

# Phase 5 - Singapore Math Support

## Goal

Make Number Bonds a primary learning feature.

---

## Database

### NumberBond

```sql
NumberBond
```

Fields:

```text
Id
Whole
PartA
PartB
```

Example:

```text
15 = 7 + 8
```

---

## Learning Activities

### Missing Part

```text
7 + ? = 15
```

---

### Missing Whole

```text
7 + 8 = ?
```

---

### Number Bond Diagram

```text
      15
     /  \
    7    8
```

---

## Dashboard

Show mastery by whole number.

Example:

```text
10 ██████████
11 ████████
12 ██████
13 ████
14 ███████
15 ███
```

Success criteria:

Weak number bonds are visible.

---

# Phase 6 - Fact Families

## Goal

Connect related math facts.

---

## Example Family

```text
7 + 8 = 15

8 + 7 = 15

15 - 8 = 7

15 - 7 = 8
```

---

## Database

### FactFamily

```sql
FactFamily
```

Fields:

```text
Id
PartA
PartB
Whole
```

---

## Usage

When mastery improves for:

```text
7 + 8 = 15
```

boost related facts slightly.

Success criteria:

Learning feels more natural.

---

# Phase 7 - Reward System

## Goal

Increase motivation.

---

## Database

### Reward

```sql
Reward
```

### StudentReward

```sql
StudentReward
```

---

## Version 1 Rewards

### Fast Fox

```text
10 answers under 2 seconds
```

---

### Practice Hero

```text
Practice 7 days in a row
```

---

### Number Bond Master

```text
Master all bonds to 10
```

---

### Addition Explorer

```text
Master all addition facts to 10
```

---

## UI

Reward unlock screen.

Show:

```text
New Sticker Earned!
```

Success criteria:

Rewards unlock automatically.

---

# Phase 8 - Collectible Cards

## Goal

Create long-term motivation.

---

## Card Themes

- Dinosaurs
- Space
- Animals
- Dragons
- Vehicles

---

## Database

### Card

```sql
Card
```

Fields:

```text
Id
Name
Theme
Rarity
ImageUrl
```

---

## Unlock Rules

Examples:

```text
Complete 100 questions

Master all bonds to 15

5-day streak

Master subtraction to 20
```

---

## Collection Screen

Display:

```text
Cards Collected

Completion Percentage

Missing Cards
```

Success criteria:

Child wants to collect cards.

---

# Phase 9 - Parent Dashboard

## Goal

Provide actionable insights.

---

## Overview

Display:

```text
Questions Answered

Accuracy

Practice Time

Current Streak

Best Streak
```

---

## Weak Facts

Examples:

```text
16 - 9

14 - 8

9 + 6
```

---

## Heat Map

Color coding:

```text
Green   = Mastered

Yellow  = Learning

Red     = Weak
```

---

## Number Bond Mastery

Show:

```text
1-20 mastery map
```

Success criteria:

Parent immediately sees strengths and weaknesses.

---

# Phase 10 - Polish And Household Deployment

## Goal

Make it pleasant to use.

---

## Features

### Sound Effects

Correct answer:

```text
Pleasant chime
```

Incorrect answer:

```text
Gentle encouragement
```

---

### Themes

Examples:

```text
Dinosaurs
Space
Princess
Dragons
```

---

### Parent Settings

Configure:

```text
Question Count

Time Limits

Reward Frequency

Practice Difficulty
```

---

## Backup Strategy

Nightly PostgreSQL backup.

Store:

```text
Database dump
Reward progress
Attempt history
```

---

# Future Versions

## Multiplication

Focus on:

```text
1-12 times tables
```

---

## Division

Use fact families.

Example:

```text
4 x 5 = 20

20 ÷ 5 = 4
```

---

## Fractions

Singapore Math style models.

---

## Mobile Support

Responsive design first.

Native app later if desired.

---

# MVP Stopping Point

The first truly useful version is completed when:

✅ Questions can be answered

✅ Attempts are recorded

✅ Response times are tracked

✅ Mastery scores exist

✅ Weak facts are identified

✅ Focus mode targets weaknesses

✅ Number bonds to 20 are supported

✅ A simple reward system exists

Everything after that is enhancement rather than necessity.
