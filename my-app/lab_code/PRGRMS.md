Here are the Python programs extracted from the provided text, each with a brief explanation.

---

### 1. Missionaries-Cannibals Problem (Best-First Search)

This program solves the classic Missionaries and Cannibals problem using a Best-First Search algorithm. It defines a `State` class to represent the configuration of missionaries, cannibals, and the boat on both banks. The search uses a `PriorityQueue` to explore states, prioritizing states with lower accumulated cost (which is a uniform cost of 1 per move in this implementation, effectively making it a Breadth-First Search if there's no specific heuristic, or Dijkstra's if it used non-uniform costs).

**Code:**

```python
from queue import PriorityQueue

# Define the state class for the Missionaries and Cannibals Problem
class State:
    def __init__(self, left_m, left_c, boat, right_m, right_c):
        self.left_m = left_m  # Number of missionaries on the left bank
        self.left_c = left_c  # Number of cannibals on the left bank
        self.boat = boat      # 1 if boat is on the left bank, 0 if on the right bank
        self.right_m = right_m # Number of missionaries on the right bank
        self.right_c = right_c # Number of cannibals on the right bank

    def is_valid(self):
        # Check if the state is valid (no missionaries eaten on either bank)
        if self.left_m < 0 or self.left_c < 0 or self.right_m < 0 or self.right_c < 0:
            return False
        if self.left_m > 0 and self.left_c > self.left_m:
            return False
        if self.right_m > 0 and self.right_c > self.right_m:
            return False
        return True

    def is_goal(self):
        # Check if the state is the goal state (all missionaries and cannibals on the right bank)
        return self.left_m == 0 and self.left_c == 0

    def __lt__(self, other):
        # Define less-than operator for PriorityQueue comparison (used in Best-First Search)
        # In a uniform cost search (like this one where cost is always 1),
        # this acts like a BFS. For a true Best-First, a heuristic would be added.
        return False # This effectively makes it order by insertion for equal priorities

    def __eq__(self, other):
        # Define equality operator for comparing states
        return self.left_m == other.left_m and \
               self.left_c == other.left_c and \
               self.boat == other.boat and \
               self.right_m == other.right_m and \
               self.right_c == other.right_c

    def __hash__(self):
        # Define hash function for storing states in a set
        return hash((self.left_m, self.left_c, self.boat, self.right_m, self.right_c))

def successors(state):
    # Generate all valid successor states from the current state
    succ_states = []
    if state.boat == 1: # Boat is on the left bank
        for m in range(3):
            for c in range(3):
                if 1 <= m + c <= 2: # Boat capacity is 2
                    new_state = State(state.left_m - m, state.left_c - c, 0,
                                      state.right_m + m, state.right_c + c)
                    if new_state.is_valid():
                        succ_states.append(new_state)
    else: # Boat is on the right bank
        for m in range(3):
            for c in range(3):
                if 1 <= m + c <= 2: # Boat capacity is 2
                    new_state = State(state.left_m + m, state.left_c + c, 1,
                                      state.right_m - m, state.right_c - c)
                    if new_state.is_valid():
                        succ_states.append(new_state)
    return succ_states

def best_first_search():
    start_state = State(3, 3, 1, 0, 0)
    goal_state = State(0, 0, 0, 3, 3)

    frontier = PriorityQueue()
    frontier.put((0, start_state)) # Priority queue with (cost, state)
    came_from = {}
    cost_so_far = {}

    came_from[start_state] = None
    cost_so_far[start_state] = 0

    while not frontier.empty():
        current_cost, current_state = frontier.get()

        if current_state == goal_state:
            # Reconstruct the path from start state to goal state
            path = []
            while current_state is not None:
                path.append(current_state)
                current_state = came_from[current_state]
            path.reverse()
            return path

        for next_state in successors(current_state):
            new_cost = cost_so_far[current_state] + 1 # Uniform cost of 1 for each move
            if next_state not in cost_so_far or new_cost < cost_so_far[next_state]:
                cost_so_far[next_state] = new_cost
                priority = new_cost # Best-First Search uses cost as priority
                frontier.put((priority, next_state))
                came_from[next_state] = current_state

    return None # No path found

def print_solution(path):
    if path is None:
        print("No solution found.")
    else:
        print("Solution found!")
        for i, state in enumerate(path):
            print(f"Step {i}:")
            print(f"Left Bank: {state.left_m} missionaries, {state.left_c} cannibals")
            print(f"Boat is {'on the left' if state.boat == 1 else 'on the right'} bank")
            print(f"Right Bank: {state.right_m} missionaries, {state.right_c} cannibals")
            print("------------")

# Main function to run the Best-First Search and print the solution
if __name__ == "__main__":
    solution_path = best_first_search()
    print_solution(solution_path)
```

---

### 2. Missionaries & Cannibals Problem (Interactive Game)

This program implements an interactive text-based game for the Missionaries and Cannibals problem. Users input the number of missionaries and cannibals to move, and the game checks for valid moves and win/loss conditions.

**Code:**

```python
#Python program to illustrate Missionaries & cannibals Problem

print("\n")
print("\tGame Start\nNow the task is to move all of them to right side of the river")
print("rules:\n1. The boat can carry at most two people")
print("2. If cannibals num greater than missionaries then the cannibals would eat the missionaries")
print("3. The boat cannot cross the river by itself with no people on board")

# Initial state: 3 missionaries, 3 cannibals on the left, boat on left, 0 on right
lM = 3 # Left side Missionaries number
lC = 3 # Left side Cannibals number
rM = 0 # Right side Missionaries number
rC = 0 # Right side cannibals number

userM = 0 # User input for number of missionaries for right to left travel
userC = 0 # User input for number of cannibals for right to left travel
k = 0 # Step counter

def display_state():
    print(f"\nM M M C C C | {'' if lM > 0 else ' '} {'' if lC > 0 else ' '}"
          f"{' | --> | ' if k % 2 == 0 else ' | <-- | '}" # Boat direction
          f"{'' if rM > 0 else ' '} {'' if rC > 0 else ' '}")
    print(f"{'M ' * lM}{'C ' * lC}| {' ' * 5} |{'M ' * rM}{'C ' * rC}")

def check_game_over(current_lM, current_lC, current_rM, current_rC):
    # Loss conditions: cannibals outnumber missionaries on either bank (if missionaries are present)
    if (current_lM > 0 and current_lC > current_lM) or \
       (current_rM > 0 and current_rC > current_rM):
        print("Cannibals eat missionaries:\nYou lost the game")
        return True
    return False

try:
    while True: # Main game loop
        display_state()
        print(f"\nStep: {k}")

        if k % 2 == 0: # Boat on left side (moving Left -> Right)
            print("Left side -> right side river travel")
            while True:
                uM = int(input("Enter number of Missionaries travel => "))
                uC = int(input("Enter number of Cannibals travel => "))

                if uM == 0 and uC == 0:
                    print("Empty travel not possible")
                    print("Re-enter : ")
                elif (uM + uC <= 2) and ((lM - uM) >= 0) and ((lC - uC) >= 0):
                    break
                else:
                    print("Wrong input re-enter : ")
            
            # Update state
            lM -= uM
            lC -= uC
            rM += uM
            rC += uC

        else: # Boat on right side (moving Right -> Left)
            print("Right side -> Left side river travel")
            while True:
                uM = int(input("Enter number of Missionaries travel => "))
                uC = int(input("Enter number of Cannibals travel => "))

                if uM == 0 and uC == 0:
                    print("Empty travel not possible")
                    print("Re-enter : ")
                elif (uM + uC <= 2) and ((rM - uM) >= 0) and ((rC - uC) >= 0):
                    break
                else:
                    print("Wrong input re-enter :")

            # Update state
            lM += uM
            lC += uC
            rM -= uM
            rC -= uC
        
        k += 1 # Increment step counter

        if check_game_over(lM, lC, rM, rC):
            break

        if (rM + rC) == 6: # Goal state: all 6 people on the right bank
            print("You won the game : \n\tCongrats")
            print("Total attempt:", k)
            break

except ValueError:
    print("\nInvalid input, please enter numbers!")
except EOFError as e:
    print("\nInvalid input please retry !!")

```

---

### 3. Water Jug Problem (DFS)

This program solves the Water Jug Problem using a Depth-First Search (DFS) algorithm. It defines functions to check the goal state, generate possible next states (filling, emptying, pouring jugs), and then uses a recursive DFS approach to find a solution path.

**Code:**

```python
# Water Jug Problem

def is_goal(state, goal):
    """Checks if the current state matches the goal amount in either jug."""
    return state[0] == goal or state[1] == goal

def get_next_states(state, a_cap, b_cap):
    """Generates all possible next states from the current state."""
    a, b = state
    states = []

    # Fill A or B
    states.append((a_cap, b)) # Fill A
    states.append((a, b_cap)) # Fill B

    # Empty A or B
    states.append((0, b))     # Empty A
    states.append((a, 0))     # Empty B

    # Pour A -> B
    pour_to_b = min(a, b_cap - b)
    states.append((a - pour_to_b, b + pour_to_b))

    # Pour B -> A
    pour_to_a = min(b, a_cap - a)
    states.append((a + pour_to_a, b - pour_to_a))

    return states

def dfs(a_cap, b_cap, goal):
    """Performs a Depth-First Search to find a solution to the Water Jug Problem."""
    stack = []
    visited = set()
    path = []

    initial_state = (0, 0)
    stack.append((initial_state, [initial_state])) # Store (current_state, path_to_current_state)

    while stack:
        current_state, current_path = stack.pop()

        if current_state in visited:
            continue
        
        visited.add(current_state)

        if is_goal(current_state, goal):
            return current_path

        for next_state in get_next_states(current_state, a_cap, b_cap):
            if next_state not in visited:
                stack.append((next_state, current_path + [next_state]))

    return None # No solution found

# Example usage
a_capacity = 4
b_capacity = 3
goal_amount = 2

solution_path = dfs(a_capacity, b_capacity, goal_amount)

if solution_path:
    print("Solution path:")
    for step in solution_path:
        print(f"Jug A: {step[0]} | Jug B: {step[1]}")
else:
    print("No solution found.")
```

---

### 4. Travelling Salesman Problem (Nearest Neighbor)

This program implements the Nearest Neighbor heuristic for solving the Travelling Salesman Problem (TSP). It starts from an arbitrary city and repeatedly visits the nearest unvisited city until all cities have been visited, then returns to the starting city.

**Code:**

```python
import sys

# Travelling Salesman Problem

def nearest_neighbor_tsp(distances):
    """
    Solves the Travelling Salesman Problem using the Nearest Neighbor heuristic.
    
    Args:
        distances (list of list): A square matrix representing the distances
                                   between cities. distances[i][j] is the
                                   distance from city i to city j.

    Returns:
        tuple: A tuple containing the tour (list of city indices) and the
               total distance of the tour.
    """
    num_cities = len(distances)

    # Start from the first city (arbitrary choice)
    tour = [0] # Store the tour as a list of city indices
    visited = set([0]) # Track visited cities

    current_city = 0
    total_distance = 0

    while len(visited) < num_cities:
        nearest_city = None
        min_distance = sys.maxsize

        # Find the nearest unvisited city
        for next_city in range(num_cities):
            if next_city not in visited and distances[current_city][next_city] < min_distance:
                nearest_city = next_city
                min_distance = distances[current_city][next_city]

        # Move to the nearest city
        tour.append(nearest_city)
        visited.add(nearest_city)
        total_distance += min_distance
        current_city = nearest_city

    # Complete the tour by returning to the starting city
    tour.append(0)
    total_distance += distances[current_city][0]

    return tour, total_distance

# Example usage:
if __name__ == "__main__":
    # Example distance matrix (symmetric, square matrix)
    # Cities: 0, 1, 2, 3, 4
    distances = [
        [0, 4, 8, 9, 12],
        [4, 0, 6, 8, 9],
        [8, 6, 0, 10, 11],
        [9, 8, 10, 0, 7],
        [12, 9, 11, 7, 0]
    ]

    # Run nearest neighbor TSP algorithm
    tour, total_distance = nearest_neighbor_tsp(distances)

    # Print the tour and total distance
    print("Nearest Neighbor TSP Tour:", tour)
    print("Total Distance:", total_distance)
```

---

### 5. N-Queens Problem (Only 1 Solution)

This program solves the N-Queens problem using a backtracking algorithm to find *one* valid solution. It attempts to place queens row by row, checking for safety (no other queen in the same column or diagonal) at each step. If a queen cannot be placed in a row, it backtracks.

**Code:**

```python
# N - Queens Problem (Only 1 solution)

def is_safe(board, row, col):
    """
    Check if it's safe to place a queen at board[row][col].
    A queen is safe if no other queen is in the same column,
    or on the same upper-left or upper-right diagonal.
    """
    n = len(board)

    # Check column
    for i in range(row):
        if board[i][col] == 1:
            return False

    # Check upper diagonal on left side
    i, j = row, col
    while i >= 0 and j >= 0:
        if board[i][j] == 1:
            return False
        i -= 1
        j -= 1

    # Check upper diagonal on right side
    i, j = row, col
    while i >= 0 and j < n:
        if board[i][j] == 1:
            return False
        i -= 1
        j += 1

    return True

def solve_queens(board, row):
    """
    Recursively solves the N-Queens Problem using backtracking.
    Attempts to place a queen in the current row.
    """
    n = len(board)

    # Base case: If all queens are placed, return True
    if row >= n:
        return True

    # Try placing a queen in each column of the current row
    for col in range(n):
        if is_safe(board, row, col):
            board[row][col] = 1 # Place the queen

            # Recur to place the rest of the queens
            if solve_queens(board, row + 1):
                return True

            # If placing queen at board[row][col] doesn't lead to a solution, backtrack
            board[row][col] = 0 # Remove the queen

    return False # No solution found for this row

def print_board(board):
    """Prints the board configuration."""
    n = len(board)
    for i in range(n):
        for j in range(n):
            print(board[i][j], end=" ")
        print() # New line after each row
    print() # Additional new line for separation

def solve_8queens():
    """
    Solve the 8-Queens Problem and print the solution.
    """
    n = 8 # Size of the chessboard (8x8)
    board = [[0] * n for _ in range(n)] # Initialize empty board

    if solve_queens(board, 0):
        print("Solution found:")
        print_board(board)
    else:
        print("No solution exists.")

# Call the function to solve the 8-Queens Problem
if __name__ == "__main__":
    solve_8queens()
```

---

### 6. N-Queens Problem (All Possible Solutions)

This program extends the N-Queens solver to find *all* possible solutions. Instead of returning `True` after finding the first solution, it continues to explore other possibilities by backtracking, and stores each complete valid configuration in a list.

**Code:**

```python
# N - Queens Problem (All possible solutions)

def is_safe(board, row, col):
    """
    Check if it's safe to place a queen at board[row][col].
    A queen is safe if no other queen is in the same column,
    or on the same upper-left or upper-right diagonal.
    """
    n = len(board)

    # Check column
    for i in range(row):
        if board[i][col] == 1:
            return False

    # Check upper diagonal on left side
    i, j = row, col
    while i >= 0 and j >= 0:
        if board[i][j] == 1:
            return False
        i -= 1
        j -= 1

    # Check upper diagonal on right side
    i, j = row, col
    while i >= 0 and j < n:
        if board[i][j] == 1:
            return False
        i -= 1
        j += 1

    return True

def solve_queens(board, row, solutions):
    """
    Recursively solves the N-Queens Problem using backtracking,
    collecting all possible solutions.
    """
    n = len(board)

    # Base case: If all queens are placed, add the solution to the list
    if row >= n:
        # Create a deep copy of the board to store as a solution
        solutions.append([row[:] for row in board])
        return

    # Try placing a queen in each column of the current row
    for col in range(n):
        if is_safe(board, row, col):
            board[row][col] = 1 # Place the queen

            solve_queens(board, row + 1, solutions) # Recurse for the next row

            # Backtrack: remove the queen to explore other possibilities
            board[row][col] = 0

def print_board(board):
    """Prints the board configuration."""
    n = len(board)
    for i in range(n):
        for j in range(n):
            print(board[i][j], end=" ")
        print()
    print() # Additional new line for separation

def print_all_solutions():
    """
    Solve the 8-Queens Problem and print all distinct solutions.
    """
    n = 8 # Size of the chessboard (8x8)
    board = [[0] * n for _ in range(n)] # Initialize empty board
    solutions = [] # List to store all valid solutions

    solve_queens(board, 0, solutions)

    # Print all solutions found
    num_solutions = len(solutions)
    if num_solutions == 0:
        print("No solutions found.")
    else:
        print(f"Total solutions found: {num_solutions}")
        for idx, solution in enumerate(solutions, start=1):
            print(f"Solution {idx}:")
            print_board(solution)

# Call the function to print all solutions to the 8-Queens Problem
if __name__ == "__main__":
    print_all_solutions()
```

---

### 7. Tic-Tac-Toe Game

This program implements a simple interactive Tic-Tac-Toe game for two players. It includes functions to print the board, check for a win condition (rows, columns, diagonals), and determine if the board is full (tie game).

**Code:**

```python
# Tic-Tac-Toe Game

def print_board(board):
    """Prints the current state of the Tic-Tac-Toe board."""
    print()
    for row in board:
        print(" | ".join(row))
        print("-" * 9)
    print()

def check_winner(board, player):
    """Checks if the specified player has won the game."""
    # Check rows
    for row in board:
        if all(cell == player for cell in row):
            return True

    # Check columns
    for col in range(3):
        if all(board[row][col] == player for row in range(3)):
            return True

    # Check main diagonal
    if all(board[i][i] == player for i in range(3)):
        return True

    # Check anti-diagonal
    if all(board[i][2 - i] == player for i in range(3)):
        return True

    return False

def is_full(board):
    """Checks if the board is completely filled (tie game)."""
    return all(cell != ' ' for row in board for cell in row)

def tic_tac_toe():
    """Main function to run the Tic-Tac-Toe game."""
    board = [[' ' for _ in range(3)] for _ in range(3)]
    current_player = 'X'

    while True:
        print_board(board)
        print(f"Player {current_player}'s turn.")

        try:
            row = int(input("Enter row (1-3): ")) - 1
            col = int(input("Enter column (1-3): ")) - 1
        except ValueError:
            print("Invalid input! Please enter a number between 1 and 3.")
            continue

        if not (0 <= row < 3 and 0 <= col < 3):
            print("Invalid row/column. Please enter values between 1 and 3.")
            continue

        if board[row][col] == ' ':
            board[row][col] = current_player
        else:
            print("Invalid move! That spot is already taken. Try again.")
            continue

        # Check if the current player has won
        if check_winner(board, current_player):
            print_board(board)
            print(f"Player {current_player} wins!")
            break

        # Check if the board is full (tie game)
        if is_full(board):
            print_board(board)
            print("It's a tie!")
            break

        # Switch to the other player
        current_player = 'O' if current_player == 'X' else 'X'

if __name__ == "__main__":
    tic_tac_toe()
```

---

### 8. A* Algorithm

This program implements the A* search algorithm for finding the shortest path between two nodes in a graph. It uses a `Node` class to store state information, and calculates `f = g + h` where `g` is the cost from the start node and `h` is a heuristic estimate to the goal. A `PriorityQueue` (simulated with `heapq`) is used to always explore the node with the lowest `f` value.

**Code:**

```python
import heapq
import math # For math.inf

# A* Algorithm

class Node:
    def __init__(self, state, parent=None, action=None, cost=0, heuristic=0):
        self.state = state          # Current state in the search space
        self.parent = parent        # Parent node
        self.action = action        # Action that led to this node from the parent node
        self.cost = cost            # Cost to reach this node from the start node (g)
        self.heuristic = heuristic  # Heuristic estimate of the cost to reach the goal (h)

    def __lt__(self, other):
        # Define less-than operator for PriorityQueue comparison (based on f = g + h)
        return (self.cost + self.heuristic) < (other.cost + other.heuristic)

def parse_graph_input():
    """
    Reads graph edges and costs from user input.
    Expected format: u v cost (e.g., A B 10)
    """
    graph = {}
    num_edges = int(input("Enter the number of edges: "))
    print("Enter edges (format: start_node end_node cost, e.g., A B 10):")
    for _ in range(num_edges):
        line = input().split()
        if len(line) != 3:
            print("Invalid format. Please use 'u v cost'. Skipping.")
            continue
        u, v, cost_str = line
        cost = int(cost_str)

        # Add nodes and edges to the graph (undirected for this example)
        if u not in graph:
            graph[u] = []
        if v not in graph:
            graph[v] = []
        graph[u].append((v, cost))
        graph[v].append((u, cost)) # For undirected graph
    return graph

def astar_search(start_state, goal_test_func, successors_func, heuristic_func):
    """
    Performs A* search to find the optimal path from start_state to a goal.

    Args:
        start_state: The initial state.
        goal_test_func (callable): A function that takes a state and returns True if it's a goal.
        successors_func (callable): A function that takes a state and returns a list
                                   of (action, successor_state, step_cost) tuples.
        heuristic_func (callable): A function that takes a state and returns its heuristic value (h).

    Returns:
        list or None: A list of (action, state) tuples representing the path from
                      start to goal, or None if no path is found.
    """
    frontier = [] # Priority queue to store nodes ordered by f = g + h
    heapq.heappush(frontier, Node(start_state, None, None, 0, heuristic_func(start_state)))
    
    # explored set to keep track of visited states, prevents cycles and re-processing
    explored = set() 
    
    # A dictionary to store the best cost to reach a state found so far
    cost_to_reach = {start_state: 0} 
    
    # A dictionary to reconstruct the path
    came_from = {start_state: None}

    while frontier:
        current_node = heapq.heappop(frontier)
        current_state = current_node.state

        if current_state in explored:
            continue
        
        explored.add(current_state)

        if goal_test_func(current_state):
            # Reconstruct the path from the goal node to the start node
            path = []
            temp_node = current_node
            while temp_node.parent is not None:
                path.append((temp_node.action, temp_node.state))
                temp_node = temp_node.parent
            path.reverse()
            return path

        # Generate successors for the current state using the `successors` function
        for action, successor_state, step_cost in successors_func(current_state):
            new_cost = current_node.cost + step_cost

            # If this path to successor is better than any previous one
            if successor_state not in cost_to_reach or new_cost < cost_to_reach[successor_state]:
                cost_to_reach[successor_state] = new_cost
                came_from[successor_state] = current_node # Store parent for path reconstruction
                
                # Create new node and add to frontier
                new_node = Node(successor_state, current_node, action, new_cost, heuristic_func(successor_state))
                heapq.heappush(frontier, new_node)

    return None # No path found

# --- Functions for specific graph problem (provided in context) ---
graph = {} # Global graph variable

def goal_test(state):
    """Checks if the given state is the goal state."""
    return state == GOAL_STATE # Uses GOAL_STATE defined in __main__

def successors(state):
    """
    Generates successor states from the current state based on the global graph.
    Returns (action, successor_state, step_cost) tuples.
    """
    successors_list = []
    # If state not in graph, it means it's a dead end or invalid input, return empty list
    if state not in graph:
        return [] 
    
    for neighbor, cost in graph.get(state, []):
        action = f"Move to {neighbor}" # Default action description
        successor_state = neighbor
        step_cost = cost
        successors_list.append((action, successor_state, step_cost))
    return successors_list

def heuristic(state):
    """
    Define a simple heuristic function.
    This example assumes nodes are single characters (e.g., 'A', 'B')
    and uses a pre-defined (or hardcoded) heuristic_values dict.
    In a real scenario, this would be problem-specific (e.g., straight-line distance).
    """
    # This is a placeholder heuristic. In a real A* problem, 'h' should be
    # an admissible (never overestimates) and consistent estimate to the goal.
    # For a generic graph without geographical info, it's hard to define a good one.
    # For demonstration, we'll use a dummy example where the 'goal_state' is 'Z'
    # and heuristic values are differences from 'Z' or manually defined.
    # The provided text shows: heuristic_values = {key: abs(ord(key) - ord(goal_state)) for key in graph.keys()}
    # Let's adapt that logic using the GOAL_STATE variable.
    
    if not hasattr(heuristic, '_values'): # Cache heuristic values if possible
        heuristic._values = {key: abs(ord(key) - ord(GOAL_STATE)) for key in graph.keys()}
        # For nodes not in graph or not yet having a defined heuristic, use infinity
        heuristic._values.setdefault(GOAL_STATE, 0) # Goal has 0 heuristic
    
    return heuristic._values.get(state, math.inf) # Default to infinity if state not found

# Main execution block
if __name__ == "__main__":
    print("Define the graph:")
    graph = parse_graph_input()

    START_STATE = input("Enter the start state: ")
    GOAL_STATE = input("Enter the goal state: ")

    # Perform A* search using custom successors function
    path = astar_search(START_STATE, goal_test, successors, heuristic)

    # Print the resulting path found by A* search
    if path:
        print("\nPath found:")
        for action, state in path:
            print(f"Action: {action}, State: {state}")
    else:
        print("\nNo path found.")
```

---

### 9. Resolution Principle on FOPL

This program implements the Resolution Principle for First-Order Predicate Logic (FOPL). It includes functions for unification of terms (variables, constants), substitution, and the core resolution step that combines two clauses. The main `resolution` function takes a knowledge base (KB) and a query, attempting to derive an empty clause.

**Code:**

```python
# Resolution Principle on FOPL

def is_variable(x):
    """Checks if a term is a variable (starts with a lowercase letter)."""
    return isinstance(x, str) and x and x[0].islower()

def unify_var(var, x, subs):
    """Helper for unify: unifies a variable with a term."""
    if var in subs:
        return unify(subs[var], x, subs)
    elif x in subs:
        return unify(var, subs[x], subs)
    else:
        new_subs = subs.copy()
        new_subs[var] = x
        return new_subs

def unify(x, y, subs=None):
    """
    Unifies two terms (variables or constants) and returns the substitution.
    
    Args:
        x, y: The terms to unify.
        subs: The current substitution dictionary.

    Returns:
        dict: The updated substitution dictionary, or None if unification fails.
    """
    if subs is None:
        subs = {}
    
    if subs is None: # Propagate failure from recursive calls
        return None
    elif x == y:
        return subs
    elif is_variable(x):
        return unify_var(x, y, subs)
    elif is_variable(y):
        return unify_var(y, x, subs)
    elif isinstance(x, tuple) and isinstance(y, tuple) and len(x) == len(y):
        # Handle complex terms (e.g., predicates with arguments)
        # Assuming format like ('Pred', 'arg1', 'arg2')
        if x[0] != y[0]: # Predicate names must match
            return None
        new_subs = subs.copy()
        for i in range(1, len(x)):
            new_subs = unify(x[i], y[i], new_subs)
            if new_subs is None:
                return None
        return new_subs
    else:
        return None # Unification failed

def substitute(literal, subs):
    """
    Applies a substitution to a literal.
    Assumes literals are strings like "Pred(arg1,arg2)"
    """
    # Simple parsing: find predicate name and arguments
    parts = literal.split('(', 1)
    if len(parts) < 2: # Handle literals without arguments or malformed
        if is_variable(literal) and literal in subs:
            return subs[literal]
        return literal # No args, or not a variable to substitute

    pred_name = parts[0]
    args_str = parts[1].rstrip(')')
    args = [arg.strip() for arg in args_str.split(',')] if args_str else []

    new_args = [subs.get(arg, arg) for arg in args]
    return f"{pred_name}({','.join(new_args)})"


def resolve(clause1, clause2):
    """
    Performs one step of resolution between two clauses.
    
    Args:
        clause1 (frozenset): A set of literals in the first clause.
        clause2 (frozenset): A set of literals in the second clause.

    Returns:
        set: A set of new clauses derived from resolution,
             including frozenset() if an empty clause is derived.
    """
    new_clauses = set()

    for lit1 in clause1:
        for lit2 in clause2:
            # Check for complementary literals (e.g., P(x) and ~P(y))
            is_lit1_negated = lit1.startswith('~')
            is_lit2_negated = lit2.startswith('~')

            # We need one positive and one negative literal for resolution
            if is_lit1_negated == is_lit2_negated:
                continue # Both negated or both positive, no direct resolution

            # Extract base predicate/term for unification
            base_lit1 = lit1[1:] if is_lit1_negated else lit1
            base_lit2 = lit2[1:] if is_lit2_negated else lit2
            
            # Simple predicate name comparison (e.g., P(x) vs ~P(y))
            pred1_name = base_lit1.split('(')[0]
            pred2_name = base_lit2.split('(')[0]

            if pred1_name != pred2_name:
                continue # Different predicates, cannot resolve

            # Attempt unification
            # Parse arguments for unification. Simple approach: assume simple args
            # For complex terms, unify needs to be more robust.
            try:
                args1_str = base_lit1.split('(', 1)[1].rstrip(')')
                args1 = tuple(arg.strip() for arg in args1_str.split(',')) if args1_str else ()
            except IndexError:
                args1 = (base_lit1,) # Treat as a single constant/variable if no parenthesis

            try:
                args2_str = base_lit2.split('(', 1)[1].rstrip(')')
                args2 = tuple(arg.strip() for arg in args2_str.split(',')) if args2_str else ()
            except IndexError:
                args2 = (base_lit2,) # Treat as a single constant/variable if no parenthesis

            # Unify (pred_name, *args) representation
            unify_term1 = (pred1_name,) + args1
            unify_term2 = (pred2_name,) + args2

            subs = unify(unify_term1, unify_term2)

            if subs is not None:
                # Apply substitution to remaining literals in both clauses
                # Remove the resolved literals
                remaining_clause1 = (clause1 - {lit1})
                remaining_clause2 = (clause2 - {lit2})

                # Apply substitution to remaining literals
                # Ensure the literals are in the form "Pred(arg)" for substitution
                substituted_literals = set()
                for l in remaining_clause1.union(remaining_clause2):
                    substituted_literals.add(substitute(l, subs))
                
                new_clauses.add(frozenset(substituted_literals))

    return new_clauses

def resolution(kb, query):
    """
    Performs resolution refutation to check if a query entails from a knowledge base.
    
    Args:
        kb (list): A list of clauses (each a frozenset of literals) representing the knowledge base.
        query (str): The literal to be proven.

    Returns:
        bool: True if the query is entailed, False otherwise.
    """
    # Convert KB to frozensets and add the negated query
    clauses = set(frozenset(c) for c in kb)
    negated_query_clause = frozenset({f"~{query}"}) # Assume query is a positive literal
    clauses.add(negated_query_clause)

    new_clauses_added = True
    while new_clauses_added:
        new_clauses_added = False
        resolvents_this_iteration = set()

        # Iterate over all unique pairs of clauses
        clause_list = list(clauses)
        for i in range(len(clause_list)):
            for j in range(i + 1, len(clause_list)):
                c1 = clause_list[i]
                c2 = clause_list[j]

                # Perform resolution step
                derived_clauses = resolve(c1, c2)

                # Check if an empty clause is derived (refutation)
                if frozenset() in derived_clauses:
                    return True # Query is entailed

                # Add new non-empty clauses to the set for the current iteration
                resolvents_this_iteration.update(c for c in derived_clauses if c) # Filter out empty clause

        # Add newly derived clauses to the main set of clauses
        # Only add if not already present
        num_before = len(clauses)
        clauses.update(resolvents_this_iteration)
        if len(clauses) > num_before:
            new_clauses_added = True
        else: # No new clauses were generated or all were duplicates
            break
            
    return False # No empty clause derived, query is not entailed

# Example usage
if __name__ == "__main__":
    # Knowledge Base:
    # 1. P(a) OR Q(x)
    # 2. ~P(a)
    # 3. ~Q(a) (This is the negated query if we query Q(a))
    
    # Note: For simplicity, literals are strings.
    # A more robust system would parse them into objects/tuples.
    # The example given in the document was:
    # kb = [ {"P(a)", "Q(x)"}, {"~P(a)"} ]
    # query = "Q(a)"
    # This implies the literal format P(arg) and ~P(arg).
    
    kb = [
        frozenset({"P(a)", "Q(x)"}), # Clause 1: P(a) V Q(x)
        frozenset({"~P(a)"})        # Clause 2: ~P(a)
    ]
    query = "Q(a)"

    print(f"Knowledge Base: {kb}")
    print(f"Query: {query}")
    print(f"Entails {query}?", resolution(kb, query))

    # Another example for better understanding
    kb_2 = [
        frozenset({"A(x)", "~B(x)"}),
        frozenset({"B(c)"})
    ]
    query_2 = "A(c)"
    print(f"\nKnowledge Base 2: {kb_2}")
    print(f"Query 2: {query_2}")
    print(f"Entails {query_2}?", resolution(kb_2, query_2)) # Should be True (A(x) implies B(x); B(c) implies A(c))
```

---

### 10. Forward & Backward Chaining

This program demonstrates two fundamental inference mechanisms in AI: Forward Chaining and Backward Chaining.
- **Forward Chaining:** Starts with known facts and applies rules to derive new facts until the goal is reached or no more facts can be derived.
- **Backward Chaining:** Starts with the goal and works backward, looking for rules that could prove the goal, until it reduces the goal to known facts or subgoals that can be proven.

**Code:**

```python
# Forward & Backward Chaining

def forward_chaining(rules, facts, goal):
    """
    Performs forward chaining to infer new facts until the goal is reached.
    
    Args:
        rules (list): List of (condition_set, result) tuples.
                      condition_set is a frozenset of facts required for the rule.
        facts (set): Initial set of known facts.
        goal (str): The fact to be proven.

    Returns:
        bool: True if the goal is inferred, False otherwise.
    """
    inferred_facts = set(facts)
    new_facts_added = True

    while new_facts_added:
        new_facts_added = False
        
        for condition, result in rules:
            # Check if all conditions for the rule are in inferred_facts
            if all(cond in inferred_facts for cond in condition) and result not in inferred_facts:
                inferred_facts.add(result)
                new_facts_added = True # Flag that new facts were added in this iteration

                if result == goal:
                    return True # Goal reached

    return False # Goal not reached after all possible inferences

def backward_chaining(rules, facts, goal):
    """
    Performs backward chaining to determine if a goal can be proven.
    
    Args:
        rules (list): List of (condition_set, result) tuples.
        facts (set): Initial set of known facts.
        goal (str): The fact to be proven.

    Returns:
        bool: True if the goal can be proven, False otherwise.
    """

    def ask(query):
        """Internal recursive function to check if a query can be proven."""
        # 1. If query is a known fact, it's proven
        if query in facts:
            return True

        # 2. Try to prove the query using rules
        for condition, result in rules:
            if result == query: # Found a rule that proves the query
                # Check if all conditions of this rule can be proven recursively
                if all(ask(cond) for cond in condition):
                    return True
        
        return False # Query cannot be proven from facts or rules

    return ask(goal)

# Example: Animal classification problem
# Rules:
# (['hair', 'live young'], 'mammal')
# (['feathers', 'fly'], 'bird')
rules = [
    (frozenset({'hair', 'live young'}), 'mammal'),
    (frozenset({'feathers', 'fly'}), 'bird')
]

# --- Forward Chaining Example ---
print("--- Forward Chaining ---")
facts_cat = {'hair', 'live young'}
goal_cat = 'mammal'

print(f"Facts: {facts_cat}, Goal: {goal_cat}")
is_mammal = forward_chaining(rules, facts_cat, goal_cat)

if is_mammal:
    print("The cat is classified as a mammal.")
else:
    print("The cat is not classified as a mammal.")

# --- Backward Chaining Example ---
print("\n--- Backward Chaining ---")
facts_pigeon = {'feathers', 'fly'}
goal_pigeon = 'bird'

print(f"Facts: {facts_pigeon}, Goal: {goal_pigeon}")
is_bird = backward_chaining(rules, facts_pigeon, goal_pigeon)

if is_bird:
    print("The pigeon is classified as a bird.")
else:
    print("The pigeon is not classified as a bird.")
```