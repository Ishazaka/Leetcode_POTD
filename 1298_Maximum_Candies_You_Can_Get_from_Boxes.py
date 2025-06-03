from collections import deque

class Solution:
    def maxCandies(self, status, candies, keys, containedBoxes, initialBoxes):
        candies_collected = 0
        visited = set()
        found_boxes = set()
        queue = deque()

        for box in initialBoxes:
            found_boxes.add(box)
            if status[box] == 1:
                queue.append(box)
                visited.add(box)
                candies_collected += candies[box]

        while queue:
            box = queue.popleft()

            # Process contained boxes
            for inner_box in containedBoxes[box]:
                found_boxes.add(inner_box)
                if status[inner_box] == 1 and inner_box not in visited:
                    queue.append(inner_box)
                    visited.add(inner_box)
                    candies_collected += candies[inner_box]

            # Process keys
            for box_key in keys[box]:
                status[box_key] = 1  # mark as openable
                if box_key in found_boxes and box_key not in visited:
                    queue.append(box_key)
                    visited.add(box_key)
                    candies_collected += candies[box_key]

        return candies_collected
