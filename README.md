# Parallel Mergesort

Implement a parallel version of mergesort (both the original recursive and the
iterative in-place version from a previous exercise are fine). You may use any
parallelization framework or method.

I have not provided any test code, but you can base yours on test code from
other exercises. Your tests must check the correctness of the result of running
the function and run automatically when you commit through a GitHub action.

## Runtime Analysis

What is the span of the parallel program, in terms of worst-case $\Theta$? Hint:
It may help to consider the DAG of the parallel program.

### Answer

Assuming no overhead for the worker threads, the span of the parallel program is $\Theta(n log_2(n))$. As determined by the components outlined below. [The span in this case being the longest path of the DAG for a parallel program.]

1. Divide Step: A midpoint is calculated and the array is divided into two halves. all of these are constant time operations time, i.e., $\Theta(1)$.
2. Recursive Sort: Each half is sorted recursively. Since this happens in parallel, the time for this step is the time taken to sort one half because both halves are being sorted simultaneously.
3. Merge Step: After the halves are sorted, the merge helper function is called. The merging of two halves of size $n/2$ each takes $\Theta(n)$ time.
Given that the recursive sorting is the dominant factor and occurs in parallel, the "recurrence relation" for the span $T(n)$ of the parallel merge sort can be expressed as follows:

$T(n) = T(n/2) + \Theta(n)$

where $T(n/2)$ represents the span of sorting one half of the array. as stated earlier because this sorting happens in parallel we only consider the span of one half.

#### Solving this recurrence relation:

1) At the first level of recursion, the span is $T(n/2) + \Theta(n)$.
2) At the second level, it becomes $T(n/4) + \Theta(n/2) + \Theta(n)$. This is because the array is divided into two halves at each level of recursion.
3) This pattern continues, adding up to $\Theta(n)$ at each level of recursion until the size of the seach subsequent recursion reaches 1.
The depth of the recursion, or number of DAG levels, is $\log_2(n)$ because the array size is halved at each level. Since each level contributes $\Theta(n)$ to the span due to the merge operation, the total span of the algorithm is:
#### Fancy Render
$$
\Theta(n) + \Theta(n) + \cdots + \Theta(n) \text{ (repeated $\log_2(n)$ times)}
$$

This simplifies to:
### 
$$
\Theta(n \log n)
$$

Thus, the span of the parallel merge sort algorithm, in terms of worst-case $\Theta$, is $\Theta(n \log n)$.
Also it took me this long to learn how to do multiline Latex in markdown and I'm glad I finally got it this looks SO proffesional and is much better than a mess of equations in line with explanations.


