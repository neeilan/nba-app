import React, { Component } from 'react';
import {
  ScrollView,
  StyleSheet,
  TouchableHighlight,
  Text,
  Dimensions,
  View
} from 'react-native';

const {width , height} = Dimensions.get('window');

export default class BoxScore extends Component {
  constructor(props){
    super(props);
    this.state = {
      showBench : false
    }
    this.toggleBenchVisibility = this.toggleBenchVisibility.bind(this);
  }

  toggleBenchVisibility(){
    this.setState({showBench : !this.state.showBench })
  }

  render() {
    var Head =
    <View style={[styles.boxScoreRow, styles.boxScoreHead]}>
      <Text style={[styles.entry, styles.topEntry]}>Mins</Text>
      <Text style={[styles.entry, styles.topEntry]}>Pts</Text>
      <Text style={[styles.entry, styles.topEntry]}>FGS</Text>
      <Text style={[styles.entry, styles.topEntry]}>3PT</Text>
      <Text style={[styles.entry, styles.topEntry]}>FTS</Text>
      <Text style={[styles.entry, styles.topEntry]}>STL</Text>
      <Text style={[styles.entry, styles.topEntry]}>BLK</Text>
      <Text style={[styles.entry, styles.topEntry]}>PF</Text>
    </View>;

    var playerNameHead = <Text style={[styles.entry, styles.topEntry, styles.wide]}>Player</Text>;

    var row = {
      name : 'K.Bryant',
      minutes : 12,
      points : 11,
      fgm : 11,
      fga : 23,
      tpm : 10,
      tpa: 11,
      ftm : 21,
      fta : 25,
      steals : 3,
      blocks : 8,
      pf : 1
    };
    var rows = [row,row,row,row,row, row, row, row, row, row, row, row, row, row, row];

    // Show/hide bench
    if (!this.state.showBench) {
      rows = rows.slice(0,7);
      var benchText = <Text style={styles.benchText}>Show bench</Text>
    }
    else {
      var benchText =
          <Text style={styles.benchText}>Hide bench</Text>
    }
    var benchBtn = <TouchableHighlight onPress={this.toggleBenchVisibility} style={styles.benchBtn}>
        {benchText}
    </TouchableHighlight>

    var StatsCol = rows.map((row, i)=>{
      let rowIndexStyle = i%2 === 0 ? styles.even : styles.odd;
      return <View style={styles.boxScoreRow}>
        <Text style={[styles.entry, rowIndexStyle]}>{row.minutes}</Text>
        <Text style={[styles.entry, rowIndexStyle]}>{row.points}</Text>
        <Text style={[styles.entry, rowIndexStyle]}>{`${row.fgm}-${row.fga}`}</Text>
        <Text style={[styles.entry, rowIndexStyle]}>{`${row.tpm}-${row.tpa}`}</Text>
        <Text style={[styles.entry, rowIndexStyle]}>{`${row.ftm}-${row.fta}`}</Text>
        <Text style={[styles.entry, rowIndexStyle]}>{row.steals}</Text>
        <Text style={[styles.entry, rowIndexStyle]}>{row.blocks}</Text>
        <Text style={[styles.entry, rowIndexStyle]}>{row.pf}</Text>
    </View>
    })
    var NamesCol = rows.map((row, i) => {
      let rowIndexStyle = i%2 === 0 ? styles.even : styles.odd;
      return <Text style={[styles.entry, rowIndexStyle, styles.wide]}>{row.name}</Text>
    });


    return (
      <View>
          <View style={styles.boxScore}>
            <View>
              {playerNameHead}
              {NamesCol}
            </View>
            <ScrollView horizontal={true}>
              <View style={styles.stats}>
                {Head}
                {StatsCol}
              </View>
            </ScrollView>
          </View>
          <View style={{alignItems : 'center', justifyContent : 'center'}}>
            {benchBtn}
            <View/>
          </View>
      </View>);
  }

}

const styles = StyleSheet.create({
  boxScore : {
    flexDirection : 'row',
  },
  boxScoreRow : {
    flexDirection : 'row'
  },
  boxScoreHeadEntry : {
    backgroundColor : 'red',
    padding : 10
  },
  entry : {
      backgroundColor : 'grey',
      paddingTop : 7,
      paddingBottom : 7,
      paddingLeft : 15,
      width : width / 5,
  },
  wide : {
    width : width / 3,
  },
  topEntry : {
    backgroundColor : 'palegoldenrod',
    paddingTop : 12,
    paddingBottom : 12
  },
  stats : {
    flexDirection : 'column'
  },
  benchText : {
    color : 'grey'
  },
  even : {
    backgroundColor : 'mintcream'
  },
  odd : {
    backgroundColor : 'lavender'
  },
  benchBtn : {
    padding : 15,
    width : width,
    alignItems : 'center',
    backgroundColor : 'whitesmoke'
  }
});
