<p align="center">
  <img src="https://github.com/frlinh/game-analysis/blob/fdc8454a27b0f7e3e6a4803bcdb4b287c3759457/static/images/llbanner.png" />
</p>

# <p align="center"> League of Legends <br> Champion Mastery Analysis </p>

<figure>
  <p align="center"><img src="https://user-images.githubusercontent.com/31219195/187048890-b2bcf629-4aa1-4830-8005-8f08c6f5cd12.png" height="100px" />
    <img src="https://user-images.githubusercontent.com/31219195/187048891-d7444dbf-bc26-4585-9351-1659e6c0a7fe.png" height="100px" />
    <img src="https://user-images.githubusercontent.com/31219195/187048893-bde1f308-daf8-4fa6-a03c-81df4553a227.png" height="100px" />
    <img src="https://user-images.githubusercontent.com/31219195/187048895-7898e3a7-14aa-431f-a534-11d3c96521a1.png" height="100px" />
</figure>

## Champion Mastery and Learning Curve

### Overview
LoL is one of the most popular multi-player games but is still widely notorious for not being noob-friendly, in part due to its many game mechanics and its ever-expanding roster of over 150 playable Champions.

### Purpose
The purpose of this project is to create an easy-to-read and informative dashboard that allows a player to select any champion and see advanced stats for that champion, including learning curve and predicted mastery time. 

The player using this dashboard will be able to use this information to see customized predictions based on their selections, allowing them to make detailed decisions about which champions to play next. It can additionally be used as an entry funnel for new or curious players who would like to know which champions would be the most accessible to try first without having to understand a lot of granular details about the game.


**Questions:**

- How long does it take to master [ Champion ]?
  
- How many matches would it take to master [ Champion ]?
  
- How "hard" is it to play [ Champion ]?

- Are the newer Champions harder to learn than the original Champions?

- Which Champions have similar characteristics?

- Which Champions would I be good at based on my current champion masteries?

## Resources
### Definitions (to-do):
### Data Sources:
- Riot Developer tools ([Documentation](https://developer.riotgames.com/docs/lol)):
  - APIs used:
    - [champion-mastery-v4](https://developer.riotgames.com/apis#champion-mastery-v4) - _'Champion entries for all champions' and 'Total champion mastery score' by encrypted summonerID_
    - [league-v4](https://developer.riotgames.com/apis#league-v4) - _All league entries for Ranked Solo 5x5 by encrypted summonerID including Master+ leagues_
  - [Champion Information](http://ddragon.leagueoflegends.com/cdn/12.15.1/data/en_US/champion.json) from DataDragon 
 
### Tools:

- **Database:** pgAdmin 4 and PostgreSQL, Amazon Web Services (AWS)

- **Analyzing Data:** Jupyter, Pandas

- **Machining Learning:** Imbalanced-learn, Scikit-learn, Tensorflow

- **Data Visualization:** JavaScript, Plotly, CSS, Flask, Tableau, HTML


### Communication Protocols:

**Team Players:** Becky Nguyen, Kevin Zhang, Linh Ha, Peter Villalpando, Stella Kim

**Communication Portal:** Slack

**Zoom Meetings:** Monday from 6:30 PM to 9 PM, Wednesday from 6:30 PM to 9 PM, and Saturday from 10 AM to 12 PM

## Database
Our database joins multiple sources of summoner data and other relevant gameplay stats across all champions. In order to hone in our analysis, we set the following specifications for our data:
- **Region:** North America (NA1)
- **Queue:** Ranked Solo 5x5
- **League:** Diamond I and higher 

### Schema
_ERD Version 1_
<p align="center"><img src="https://user-images.githubusercontent.com/31219195/187050868-c3c9bb3c-01e7-4017-89e1-950e2a7f6100.png" width="300" /></p>

- The ```champions``` table contains all the built-in Champion details and attributes.
- The ```summoners``` table contains a list of (encrypted) summonerIDs that were extracted from Diamond, Master, Grandmaster, and Challenger game entries using the leaguev4 API as well as external leaderboards
- The ```champion-mastery``` table contains all the available Champion Mastery details on for a specific Summoner from the champion-masteryv4 API.
- The ```total-champion-mastery-score``` is a two-column table that contains the Summoner's encrypted summonerID and total Mastery Score
- The ```master-league-ranked-5x5```, ```diamond-league-ranked5x5```, ```grandmaster-league-ranked5x5```, and ```challenger-league-ranked5x5``` tables contain summoner information for all summoners in its respective league

![pgadmin_setup](https://user-images.githubusercontent.com/31219195/187055283-5b187721-3758-43b8-87a8-b790b7f1d1fe.png)

The database for our project lives in pgAdmin. The tables are imported from the .sql ERD created in [Quick DBD](http://quickdatabasediagrams.com) and have been populated with data from the .csv raw data that was cleaned up beforehand using Python in a Jupyter notebook. Each table was queried to confirm that data was properly added. The Data Output window in the bottom of pgAdmin displays the results of the highlighted query.

## Data Analysis
Once the Databases are pulled from the API and Json files, Data cleanup begins in order to process the Data through the Machine learning code.
Using Jupyter Notebook, Google Collab and Python, the Data analysis teams aims to create a clean data sheet from the Databases pulled. 

For simple access, Github files were downloaded through Raw files and coverted to CVS locally.

![Screen Shot 2022-08-28 at 3 43 47 PM](https://user-images.githubusercontent.com/100393032/187097623-d38a9e8a-23e5-45bf-85d2-87c06217144b.png)

Once the Database was pulled locally, cleanup begins with the dropping of columns unneccessary to the Analysis of the file. This allows the code to run cleanly and without issues. The columns that were kept were decided in the group meetings, dependent upon the purpose of the Champion mastery.

![Screen Shot 2022-08-28 at 3 47 46 PM](https://user-images.githubusercontent.com/100393032/187097713-9c51e668-249d-472d-9466-a71f711a2c6f.png)

Columns were dropped, and testing was provided to ensure the Machine learning models would run correctly (this includes columns with strings, or integers not relevant to the analysis).

![image](https://user-images.githubusercontent.com/100393032/187097994-913258a6-f9e7-4e93-a412-3f096dee96b0.png)

Our testing initally ran an accuracy of 35% but as our model develops and improves we will be aiming for a higher goal.

![image](https://user-images.githubusercontent.com/100393032/187098082-bde79dd5-d464-40fb-be88-b8d797e67998.png)

By dividing the data into the four league rankings, we can see that the accuracy isn't very high, but as LoL is a "team-based strategy game" so the accuracy is misleading and actually quite high considering the unknown variables that come from human gamplay, time spent playing, and variety of the Champions.

![image](https://user-images.githubusercontent.com/100393032/187098198-da3ddd16-955c-47b8-baf8-c29a2f68bbd0.png)

After running the confusion matrix, a visual understanding of the chosen variable "League Rankings" displays a low prediction which helps to determine the team that moving forward with this analysis will lead to low percentages of predictibality. A new model will likely be chosen to ensure a higher rate of accuracy. 

![image](https://user-images.githubusercontent.com/100393032/187098431-4eeb50b8-feee-4aa4-aa30-edc0efccff32.png)

One thing we can see from this graph is the outliers of wins and losses compared to the amount of games played. The graph shows a cluster of games around the 200 games played mark. This could be of note to the learning factor as we move forward with this project.

![image](https://user-images.githubusercontent.com/100393032/187098657-37a338ad-37f0-4609-87ab-3d3948ab1791.png)

Now that all of the Databases have been pulled and uploaded, the next step will be to provide a cleaning and merging of the databases in order to run several machine learning models and find the highest accuracy that is relevant to the outcome of Champion Mastery.

## Machining Learning
For our project, we practiced using various machine learning models to test which would be the best fit. We start with loading in our data from the championMasteryBeta.csv.

<img width="936" alt="Screen Shot 2022-09-04 at 2 12 36 PM" src="https://user-images.githubusercontent.com/100896787/188298987-bf6bf7a8-4153-4edc-bbbd-d6a49e6b5d84.png">

We then drop the other columns until our dataframe shows only the championID, championLevel, championPoints, and tokensEarned. Our models will be using the championPoints as the x-variable. 

<img width="928" alt="Screen Shot 2022-09-04 at 2 18 47 PM" src="https://user-images.githubusercontent.com/100896787/188299004-e4895c1c-f515-4d8a-8b94-c076ca5ee110.png">

### Logistic Regression
With logistic regression, we split our dataset into test and training, then scale the data before training and evaluating our model. Our current model shows: 

 Logistic regression model accuracy: 0.372

### Basic Neural Network
Similar to a logistic regression, a basic neural network can predict a dependent output variable from independent input variables. After defining the basic neural network model, we compile, train, and evaluate using test data. Our current dummy model showed an accuracy rate less than our logistic regression model:

 Basic Neural Network model accuracy: 0.014

### Deep Learning Model
With a deep learning model, we would be using more than one layer with the hopes of increasing the accuracy. 

 SVM model model accuracy: 0.050

### Random Forest
If our dataset has a sufficient number of datapoints, then a random forest model would be a good contender as they are able to perform at a similar capacity as deep learning models, and sometimes faster. However, we need to keep in mind that if our data has high variability, the deep learning model may be able to detect that better. It could be a possibility that we'll need to conduct both tests.

 Random forest predictive model accuracy: 1.000
 
### Conclusion
The Random Forest is the best model to use because it had the highest accuracy score of 1.00. The other models all had an accuracy score below 0.372. 

## Presentation
Here is the Google Slides version of our [presentation](https://docs.google.com/presentation/d/1F-JlsLppbihsJczyLr8Sn_S8Bs4aVmP5UtRGdgwIj4I/edit?usp=sharing).
