SETUP:
1. cmd > node app.js
2. W przeglądarce: <hostname>:3000/
    (<hostname> - localhost / adres IP)
3. Jeżeli nie wyświetla się lista poziomów, można wejśc hiperłączem EDYTOR do edytora.
    >EDYTOR - można edytowac pola i sciany. Uwagi:
        * pola: treasure, button, lever, pressure-plate nie są jeszcze zaimplementowane.
        * ściany MUSZĄ byc dwustronne.
        * one-way-in MUSI toważyszyc one-way-out.
        * level MUSI zawierac dokładnie JEDNO pole typu: p1-start, p2-start, p1-finish, p2-finish.
        * maksymalna ilośc pól typu enemy to 8.
4. Można zapisac poziom z autoryzacją po dodaniu usera.
5. W liście poziomów przycisk PREVIEW wygeneruje minimapkę poziomu.
6. Kliknij na tytuł poziomu, by zacząc grac.
7. Gra nie rozpocznie się, dopóki nie dołączy drugi gracz.
8. Naciśnij "M" w czasie rozgrywki by zobaczyc minimapkę.
9. Celem gry jest doprowadzenie obu graczy do konca.
10. Powstrzymywac graczy będą roboty-pająki.
11. Niektóre drzwi są też wyposarzone w pole siłowe - w jedną stronę da się przejśc, ale w drugą nie.