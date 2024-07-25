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
int theMaximumAchievableX(int num, int t)
{
    return num + (2 * t);
}
vector<int> getConcatenation(vector<int> &nums)
{
    vector<int> ans;
    int size = nums.size();
    for (int i = 0; i < size; i++)
    {
        ans[i] = nums[i];
        ans[i + size] = nums[i];
    }
    return ans;
}
int minimumOperations(vector<int> &nums)
{
    int count = 0;
    for (int i = 0; i < nums.size(); i++)
    {
        if (nums[i] % 3 != 0)
            count++;
    }
    return count;
}
int finalValueAfterOperations(vector<string> &operations)
{
    int X = 0;
    int size = operations.size();
    for (int i = 0; i < size; i++)
    {
        string operation = operations[i];
        if (operation[0] == '+' || operation[2] == '+')
            X++;
        else
            X--;
    }
    return X;
}
string defangIPaddr(string address)
{
    string validAddress = "";
    for (int i = 0; i < address.length(); i++)
    {
        if (address[i] == '.')
        {
            validAddress.push_back('[');
            validAddress.push_back('.');
            validAddress.push_back(']');
        }
        else
        {
            validAddress.push_back(address[i]);
        }
    }
    return validAddress;
}
struct Node
{
    Node *next;
    int data;
    Node(int val)
    {
        this->data = val;
        this->next = nullptr;
    }
};

class LinkedList
{
private:
public:
    Node *head;
    Node *tail;
    LinkedList()
    {
        this->head = nullptr;
        this->tail = nullptr;
    }
    void insert(int val)
    {
        Node *newNode = new Node(val);
        if (head == nullptr)
        {
            head = newNode;
            tail = newNode;
        }
        else
        {
            tail->next = newNode;
            tail = newNode;
        }
    }
    void printList(Node *head)
    {
        Node *temp = head;
        while (temp)
        {
            cout << temp->data << " ";
            temp = temp->next;
        }
    }
    Node *mergeNodes(Node *head)
    {
        int sum = 0;
        Node *newHead = nullptr;
        Node *newTail = nullptr;
        Node *temp = head;
        while (temp)
        {
            if (temp == head)
            {
                temp = temp->next;
                continue;
            }
            else if (temp->data != 0)
            {
                sum += temp->data;
            }
            else if (temp->data == 0)
            {
                Node *newNode = new Node(sum);
                if (!newHead)
                {
                    newHead = newNode;
                    newTail = newNode;
                }
                else
                {
                    newTail->next = newNode;
                    newTail = newNode;
                }
                sum = 0;
            }
            temp = temp->next;
        }
        return newHead;
    }
    ~LinkedList()
    {
        Node *temp = head;
        while (temp)
        {
            Node *temp2 = temp;
            temp = temp->next;
            delete temp;
        }
    }
};

int main()
{
    LinkedList list;
    list.insert(0);
    list.insert(3);
    list.insert(1);
    list.insert(0);
    list.insert(4);
    list.insert(5);
    list.insert(2);
    list.insert(0);
    LinkedList list2;
    list2.head = list.mergeNodes(list.head);
    list2.printList(list2.head);
}