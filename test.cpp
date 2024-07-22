#include <iostream>
#include <vector>
using namespace std;

int ones(int num)
{
    int qoutient = 0;
    int counter = 0;
    int reminder = 0;
    int divisor = 2;
    while (qoutient != 1)
    {

        qoutient = num / divisor;
        reminder = num % divisor;
        if (qoutient == 1 || reminder == 1)
            counter++;
        if (qoutient == 1 && reminder == 1)
            counter++;
        num = qoutient;
    }
    return counter;
}
int scoreOfString(string str)
{
    int total = 0;
    int a = 0;
    int b = 0;

    for (int i = 0; i <= str.length() - 2; i++)
    {
        a = int(str[i]);
        b = int(str[i + 1]);
        total += abs(a - b);
    }
    return total;
}
int main()
{
    cout << scoreOfString("zaz");
}